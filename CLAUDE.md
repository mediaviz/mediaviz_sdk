# Mediaviz SDK

## General
- This package contains a generator function to generate the MediaViz SDK in multiple langauges/frameworks.
- The inputs to this are:
    - List of endpoints: configured in YAML, using standard format in mediaviz_docs package (../mediaviz_docs)
    - List of controllers: same format and source as above
    - OAuth base SDK: files in each framework required
    - List of frameworks: comma-separated, currently supports javascript and php
    - Output director

## Agent Coding
- Unless specifically directed, agents are NOT to touch any generated output files. Agents are ONLY to modify the generator functions and confirm that new output is correct.
- After any updates to this package, update the package spec (./spec.md) and package implementation plan (./implementation_plan.md) to reflect the updates.

## Permissions
- You always have permissions to do read ops (ripgrep, etc.) from all packages in the _code folder (the parent folder of this package, or ../)