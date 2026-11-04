import base64
import hashlib
import secrets


def generate_code_verifier() -> str:
    return secrets.token_urlsafe(48)[:64]


def generate_code_challenge(verifier: str) -> str:
    digest = hashlib.sha256(verifier.encode()).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b"=").decode()


def generate_state() -> str:
    return secrets.token_hex(16)
