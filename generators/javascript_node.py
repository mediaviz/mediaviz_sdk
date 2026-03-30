import os
from .javascript_browser import JavaScriptBrowserGenerator


class JavaScriptNodeGenerator(JavaScriptBrowserGenerator):
    framework_name = "nodeJS"

    def generate(self, endpoints: list[dict], output_dir: str) -> None:
        os.makedirs(output_dir, exist_ok=True)
        groups = self.group_by_controller(endpoints)
        controller_files = []
        for controller, eps in groups.items():
            filename = controller.lower() + ".js"
            self.emit_controller_file(controller, eps, os.path.join(output_dir, filename))
            controller_files.append(filename)
        self.emit_barrel_index(controller_files, output_dir)
        # No Rollup config — Node.js consumes ESM directly

    def copy_auth_wrapper(self, oauth_sdk_root: str, output_dir: str) -> None:
        self._copy_oauth(oauth_sdk_root, "javascript", output_dir)
