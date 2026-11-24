import json
from pathlib import Path
from threading import Lock

from app.config import UNDERSTANDING_LEVEL_FILE

MIN_UNDERSTANDING_LEVEL = 1
MAX_UNDERSTANDING_LEVEL = 12


class UnderstandingLevelStore:
    def __init__(self, file_path: Path = UNDERSTANDING_LEVEL_FILE):
        self.file_path = file_path
        self._lock = Lock()

    def get(self) -> int | None:
        with self._lock:
            self.file_path.parent.mkdir(parents=True, exist_ok=True)
            if not self.file_path.exists():
                self._write(None)
                return None

            try:
                value = json.loads(self.file_path.read_text(encoding="utf-8"))
            except (OSError, UnicodeDecodeError, json.JSONDecodeError) as error:
                raise RuntimeError("Could not read the stored understanding level") from error

            if value is not None and not self._is_valid(value):
                raise RuntimeError("The stored understanding level is invalid")
            return value

    def set(self, value: int) -> int:
        if not self._is_valid(value):
            raise ValueError("Understanding level must be an integer from 1 to 12")

        with self._lock:
            self.file_path.parent.mkdir(parents=True, exist_ok=True)
            self._write(value)
        return value

    def _write(self, value: int | None) -> None:
        temporary_path = self.file_path.with_name(f"{self.file_path.name}.tmp")
        temporary_path.write_text(f"{json.dumps(value)}\n", encoding="utf-8")
        temporary_path.replace(self.file_path)

    @staticmethod
    def _is_valid(value: object) -> bool:
        return (
            type(value) is int
            and MIN_UNDERSTANDING_LEVEL <= value <= MAX_UNDERSTANDING_LEVEL
        )
