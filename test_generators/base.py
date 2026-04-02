from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass
from urllib.parse import quote, urlencode

from naming import snake_to_camel, snake_to_pascal  # noqa: F401 — re-exported for subclasses


@dataclass
class TestResult:
    success: bool
    total: int
    passed: int
    failed: int
    output: str  # raw test runner stdout/stderr


# Deterministic test values per YAML type string
TEST_VALUES: dict[str, object] = {
    "string": "test_value",
    "integer": 42,
    "int": 42,
    "boolean": True,
    "bool": True,
    "number": 3.14,
    "float": 3.14,
    "array": ["item1", "item2"],
}

# Values chosen to exercise URL encoding
ENCODING_TEST_VALUES: dict[str, object] = {
    "string": "hello world",
    "integer": 42,
    "int": 42,
    "boolean": True,
    "bool": True,
    "number": 3.14,
    "float": 3.14,
    "array": ["item1", "item2"],
}


class BaseTestGenerator(ABC):
    framework_name: str

    @abstractmethod
    def generate(self, endpoints: list[dict], sdk_dir: str, test_dir: str) -> None:
        """Generate test files from resolved endpoints."""

    @abstractmethod
    def run(self, test_dir: str) -> TestResult:
        """Execute the generated tests. Return TestResult."""

    def group_by_controller(self, endpoints: list[dict]) -> dict[str, list[dict]]:
        groups: dict[str, list[dict]] = {}
        for ep in endpoints:
            if ep.get("hidden"):
                continue
            controller = ep["controller"].replace(" ", "_")
            groups.setdefault(controller, []).append(ep)
        return groups

    def test_value_for_type(self, type_str: str, encoding: bool = False) -> object:
        """Return a deterministic test value for a YAML type string."""
        mapping = ENCODING_TEST_VALUES if encoding else TEST_VALUES
        return mapping.get(type_str, "test_value")

    def build_expected_path(self, path_template: str, params: list[dict]) -> str:
        """
        Substitute path params with their test values (URL-encoded).
        Uses encoding test values to exercise percent-encoding.
        """
        result = path_template
        path_params = [p for p in params if p.get("in") == "path"]
        for param in path_params:
            name = param["name"]
            type_str = param.get("type", "string")
            value = self.test_value_for_type(type_str, encoding=True)
            result = result.replace(f"{{{name}}}", quote(str(value), safe=""))
        return result

    def build_expected_query_string(self, params: list[dict]) -> str:
        """
        Build expected ?key=val&key2=val2 from query params using test values.
        Returns empty string when there are no query params.
        """
        query_params = [p for p in params if p.get("in") == "query"]
        if not query_params:
            return ""
        pairs = {
            p["name"]: self.test_value_for_type(p.get("type", "string"))
            for p in query_params
        }
        return "?" + urlencode(pairs)
