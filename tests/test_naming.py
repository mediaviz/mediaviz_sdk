import pytest
from naming import snake_to_camel, snake_to_pascal


@pytest.mark.parametrize("inp,expected", [
    ("foo", "foo"),
    ("foo_bar", "fooBar"),
    ("foo_bar_baz", "fooBarBaz"),
    ("keyword_list_id", "keywordListId"),
    ("already", "already"),
])
def test_snake_to_camel(inp, expected):
    assert snake_to_camel(inp) == expected


@pytest.mark.parametrize("inp,expected", [
    ("foo", "Foo"),
    ("foo_bar", "FooBar"),
    ("foo_bar_baz", "FooBarBaz"),
    ("keyword_list_id", "KeywordListId"),
    ("already", "Already"),
])
def test_snake_to_pascal(inp, expected):
    assert snake_to_pascal(inp) == expected


def test_generators_base_delegates_snake_to_camel():
    """generators/base.py static methods delegate to naming.py (no logic duplication)."""
    from generators.base import BaseGenerator

    assert BaseGenerator.snake_to_camel("foo_bar") == snake_to_camel("foo_bar")
    assert BaseGenerator.snake_to_pascal("foo_bar") == snake_to_pascal("foo_bar")


def test_test_generators_base_imports_naming():
    """test_generators/base.py exposes snake_to_camel/pascal from naming.py."""
    import test_generators.base as tgb

    assert callable(tgb.snake_to_camel)
    assert callable(tgb.snake_to_pascal)
    assert tgb.snake_to_camel("foo_bar") == "fooBar"
    assert tgb.snake_to_pascal("foo_bar") == "FooBar"
