import argparse
import os
import shutil
import sys

from generators import discover_generators
from resolver import (
    resolve_refs, resolve_composite_files, validate_composite_endpoints,
    write_flattened_yaml, write_flattened_composites_yaml,
)
from test_generators import discover_test_generators
from test_generators.base import TestResult
from versioning import get_next_version

SDK_OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sdk_files")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate MediaViz SDK libraries from endpoint specs.")
    p.add_argument("--endpoints", required=True, help="Path to ref-list YAML file")
    p.add_argument("--controllers", required=True, help="Path to controllers directory (used for documentation; resolver infers from --endpoints location)")
    p.add_argument("--oauth-sdk", required=True, dest="oauth_sdk", help="Path to OAuth SDK root")
    p.add_argument("--frameworks", default=None, help="Comma-separated frameworks to generate. Default: all registered.")
    p.add_argument("--destination-dir", default=None, dest="destination_dir", help="Output folder name in package root. Created if missing. Default: sdk_files.")
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
    endpoints_path = os.path.abspath(args.endpoints)
    oauth_sdk_root = os.path.abspath(args.oauth_sdk)

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

    version = get_next_version(output_dir)
    archive_existing_versions(output_dir)

    version_dir = os.path.join(output_dir, f"v{version}")

    controllers_dir = os.path.dirname(os.path.abspath(args.controllers)) if args.controllers else None
    endpoints, composite_paths = resolve_refs(endpoints_path, controllers_dir=controllers_dir)
    resolved_path = write_flattened_yaml(endpoints, endpoints_path, version_dir)
    print(f"Resolved {len(endpoints)} endpoints → {resolved_path}")

    composites = None
    if composite_paths:
        composites = resolve_composite_files(composite_paths, controllers_dir=controllers_dir)
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

    print(f"\nSDK v{version} generated:")
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
