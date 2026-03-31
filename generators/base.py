from abc import ABC, abstractmethod
import re
import shutil
import os


class BaseGenerator(ABC):
    framework_name: str
    oauth_sdk_source: str

    @abstractmethod
    def generate(self, endpoints: list[dict], output_dir: str) -> None:
        """Generate SDK files from resolved endpoints into output_dir."""

    @abstractmethod
    def copy_auth_wrapper(self, oauth_sdk_root: str, output_dir: str) -> None:
        """Copy OAuth SDK source files into output_dir/oauth/."""

    def group_by_controller(self, endpoints: list[dict]) -> dict[str, list[dict]]:
        groups: dict[str, list[dict]] = {}
        for ep in endpoints:
            if ep.get("hidden"):
                continue
            controller = ep["controller"]
            groups.setdefault(controller, []).append(ep)
        return groups

    @staticmethod
    def snake_to_camel(name: str) -> str:
        parts = name.split("_")
        return parts[0] + "".join(p.capitalize() for p in parts[1:])

    @staticmethod
    def snake_to_pascal(name: str) -> str:
        return "".join(p.capitalize() for p in name.split("_"))

    def _copy_oauth(self, oauth_sdk_root: str, framework_subdir: str, output_dir: str) -> None:
        src = os.path.join(oauth_sdk_root, framework_subdir)
        dst = os.path.join(output_dir, "oauth")
        if os.path.isdir(src):
            shutil.copytree(src, dst, dirs_exist_ok=True)
        else:
            os.makedirs(dst, exist_ok=True)
