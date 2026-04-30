class OAuthError(Exception):
    def __init__(self, code: str, description: str, http_status: int):
        super().__init__(description)
        self.code = code
        self.description = description
        self.http_status = http_status

    @classmethod
    def from_response(cls, status: int, body: dict) -> "OAuthError":
        if "error" in body:
            return cls(
                code=body["error"],
                description=body.get("error_description", ""),
                http_status=status,
            )
        return cls(
            code="server_error",
            description="Unexpected server response",
            http_status=status,
        )
