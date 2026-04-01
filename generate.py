import argparse
import os
import sys

from generators import discover_generators
from resolver import resolve_refs, write_flattened_yaml
from versioning import get_next_version


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate MediaViz SDK libraries from endpoint specs.")
    p.add_argument("--endpoints", required=True, help="Path to ref-list YAML file")
    p.add_argument("--controllers", required=True, help="Path to controllers directory (used for documentation; resolver infers from --endpoints location)")
    p.add_argument("--oauth-sdk", required=True, dest="oauth_sdk", help="Path to OAuth SDK root")
    p.add_argument("--frameworks", default=None, help="Comma-separated frameworks to generate. Default: all registered.")
    p.add_argument("--output", default="./output/", help="Output root directory. Default: ./output/")
    return p.parse_args()


def main() -> None:
    args = parse_args()

    output_dir = os.path.abspath(args.output)
    endpoints_path = os.path.abspath(args.endpoints)
    oauth_sdk_root = os.path.abspath(args.oauth_sdk)

    registry = discover_generators()

    if args.frameworks:
        requested = [f.strip() for f in args.frameworks.split(",")]
        unknown = [f for f in requested if f not in registry]
        if unknown:
            print(f"Error: unknown framework(s): {', '.join(unknown)}. Available: {sorted(registry)}", file=sys.stderr)
            sys.exit(1)
    else:
        requested = list(registry.keys())

    version = get_next_version(output_dir)

    endpoints = resolve_refs(endpoints_path)
    resolved_path = write_flattened_yaml(endpoints, endpoints_path, output_dir, version)
    print(f"Resolved {len(endpoints)} endpoints → {resolved_path}")

    file_counts: dict[str, int] = {}
    for framework in requested:
        gen = registry[framework]()
        fw_dir = os.path.join(output_dir, f"v{version}", framework)
        os.makedirs(fw_dir, exist_ok=True)
        gen.copy_auth_wrapper(oauth_sdk_root, fw_dir)
        gen.generate(endpoints, fw_dir)
        file_counts[framework] = sum(len(files) for _, _, files in os.walk(fw_dir))

    print(f"\nSDK v{version} generated:")
    for fw, count in file_counts.items():
        print(f"  {fw}: {count} file(s) → {os.path.join(output_dir, f'v{version}', fw)}")


if __name__ == "__main__":
    main()
