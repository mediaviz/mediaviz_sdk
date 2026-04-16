import argparse
import os
import shutil
import sys

from generators import discover_generators
from github_sources import fetch_sources, resolve_flow_path
from resolver import (
    load_schemas, resolve_refs, resolve_composite_files, validate_composite_endpoints,
    write_flattened_yaml, write_flattened_composites_yaml,
)
from test_generators import discover_test_generators
from test_generators.base import TestResult
from versioning import get_next_version, version_str

SDK_OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sdk")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate MediaViz SDK libraries from endpoint specs.")
    p.add_argument("--endpoints", required=True, help="Flow name in common_flows/sdk_endpoints (e.g. 'basic_sdk_flow_endpoints')")
    p.add_argument("--branch", default=None, help="Git branch to use for all source repos. Falls back to main if not found.")
    p.add_argument("--frameworks", default=None, help="Comma-separated frameworks to generate. Default: all registered.")
    p.add_argument("--destination-dir", default=None, dest="destination_dir", help="Output folder name in package root. Created if missing. Default: sdk.")
    bump = p.add_mutually_exclusive_group()
    bump.add_argument("--minor-version", action="store_true", help="Increment minor version and reset iteration to 0.")
    bump.add_argument("--major-version", action="store_true", help="Increment major version and reset minor+iteration to 0.")
    return p.parse_args()


def print_test_summary(results: dict[str, TestResult]) -> None:
    failures = [(fw, r) for fw, r in results.items() if not r.success]
    passing = [(fw, r) for fw, r in results.items() if r.success]

    if failures:
        print("\n── Test Failures ──────────────────────────────────")
        for fw, r in failures:
            print(f"  [{fw}] {r.failed}/{r.total} failed")
            for line in r.output.splitlines():
                if line.strip():
                    print(f"    {line}")
        print()

    print("── Test Results ───────────────────────────────────")
    for fw, r in passing:
        print(f"  [{fw}] {r.passed}/{r.total} passed")
    for fw, r in failures:
        print(f"  [{fw}] {r.passed}/{r.total} passed, {r.failed} FAILED")


def archive_existing_versions(output_dir: str) -> None:
    """Move all existing v* dirs to archive/ before generating a new version."""
    if not os.path.isdir(output_dir):
        return
    archive_dir = os.path.join(output_dir, "archive")
    for entry in os.listdir(output_dir):
        if entry == "archive":
            continue
        entry_path = os.path.join(output_dir, entry)
        if os.path.isdir(entry_path) and entry.startswith("v"):
            os.makedirs(archive_dir, exist_ok=True)
            dest = os.path.join(archive_dir, entry)
            if os.path.exists(dest):
                shutil.rmtree(dest)
            shutil.move(entry_path, dest)
            print(f"Archived {entry} → archive/{entry}")


def main() -> None:
    args = parse_args()

    if args.destination_dir:
        output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), args.destination_dir)
        os.makedirs(output_dir, exist_ok=True)
    else:
        output_dir = SDK_OUTPUT_DIR

    registry = discover_generators()
    test_registry = discover_test_generators()

    if args.frameworks:
        requested = [f.strip() for f in args.frameworks.split(",")]
        unknown = [f for f in requested if f not in registry]
        if unknown:
            print(f"Error: unknown framework(s): {', '.join(unknown)}. Available: {sorted(registry)}", file=sys.stderr)
            sys.exit(1)
    else:
        requested = list(registry.keys())

    with fetch_sources(args.branch) as sources:
        endpoints_path = resolve_flow_path(args.endpoints, sources.flows_dir)
        oauth_sdk_root = sources.oauth_sdk_root
        controllers_dir = sources.controllers_dir

        bump = "major" if args.major_version else "minor" if args.minor_version else "iteration"
        version = get_next_version(output_dir, bump)
        archive_existing_versions(output_dir)

        ver = version_str(*version)
        version_dir = os.path.join(output_dir, f"v{ver}")

        schemas = load_schemas(sources.schemas_path)
        endpoints, composite_paths = resolve_refs(
            endpoints_path, controllers_dir=controllers_dir, schemas=schemas,
        )
        resolved_path = write_flattened_yaml(endpoints, endpoints_path, version_dir)
        print(f"Resolved {len(endpoints)} endpoints → {resolved_path}")

        composites = None
        if composite_paths:
            composites = resolve_composite_files(
                composite_paths, controllers_dir=controllers_dir, schemas=schemas,
            )
            try:
                validate_composite_endpoints(composites, endpoints)
            except ValueError as e:
                print(f"Error: {e}", file=sys.stderr)
                sys.exit(1)
            resolved_comp_path = write_flattened_composites_yaml(composites, composite_paths[0], version_dir)
            print(f"Resolved {len(composites)} composite(s) → {resolved_comp_path}")

        file_counts: dict[str, int] = {}
        for framework in requested:
            gen = registry[framework]()
            fw_dir = os.path.join(version_dir, framework)
            os.makedirs(fw_dir, exist_ok=True)
            gen.copy_auth_wrapper(oauth_sdk_root, fw_dir)
            gen.generate(endpoints, fw_dir, composites=composites)
            file_counts[framework] = sum(len(files) for _, _, files in os.walk(fw_dir))

        print(f"\nSDK v{ver} generated:")
        for fw, count in file_counts.items():
            print(f"  {fw}: {count} file(s) → {os.path.join(version_dir, fw)}")

        test_results: dict[str, TestResult] = {}
        for framework in requested:
            if framework not in test_registry:
                continue
            test_gen = test_registry[framework]()
            fw_dir = os.path.join(version_dir, framework)
            test_dir = os.path.join(version_dir, "tests", framework)
            os.makedirs(test_dir, exist_ok=True)
            test_gen.generate(endpoints, fw_dir, test_dir)
            test_results[framework] = test_gen.run(test_dir)

        if test_results:
            print_test_summary(test_results)


if __name__ == "__main__":
    main()
