"""Verify spec.md and implementation_plan.md reference the Python framework."""
from pathlib import Path

ROOT = Path(__file__).parent.parent


def test_spec_architecture_lists_python():
    text = (ROOT / "spec.md").read_text()
    assert "python.py" in text


def test_spec_naming_table_has_python():
    text = (ROOT / "spec.md").read_text()
    # The naming conventions table must have a python row
    assert "| python | snake_case |" in text


def test_spec_error_table_has_python():
    text = (ROOT / "spec.md").read_text()
    assert "| python | `errors.py`" in text


def test_spec_constraints_mention_httpx():
    text = (ROOT / "spec.md").read_text()
    assert "httpx" in text


def test_implementation_plan_exists():
    assert (ROOT / "implementation_plan.md").exists()


def test_implementation_plan_references_python_generator():
    text = (ROOT / "implementation_plan.md").read_text()
    assert "generators/python.py" in text
    assert "test_generators/python.py" in text
