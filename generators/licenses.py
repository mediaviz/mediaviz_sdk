"""Shared license-file emission for published SDK packages."""
from __future__ import annotations

import os

MIT_LICENSE_TEXT = """MIT License

Copyright (c) 2026 MediaViz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""


def emit_license(output_dir: str) -> None:
    with open(os.path.join(output_dir, "LICENSE"), "w") as f:
        f.write(MIT_LICENSE_TEXT)


def extract_sdk_version(output_dir: str, fallback: str = "0.1.0") -> str:
    """Pull the live SDK version (e.g. '1.0.36') out of a sdk/vX.Y.Z/... path."""
    import re
    m = re.search(r'v(\d+\.\d+\.\d+)', output_dir)
    return m.group(1) if m else fallback
