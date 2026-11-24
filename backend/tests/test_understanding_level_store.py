import json
import tempfile
import unittest
from pathlib import Path

from pydantic import ValidationError

from app.routes.preferences import UnderstandingLevelUpdate
from app.services.understanding_level_store import UnderstandingLevelStore


class UnderstandingLevelStoreTests(unittest.TestCase):
    def test_missing_file_is_created_with_no_saved_value(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            file_path = Path(temporary_directory) / "data" / "understanding_level.json"
            store = UnderstandingLevelStore(file_path)

            self.assertIsNone(store.get())
            self.assertTrue(file_path.is_file())
            self.assertIsNone(json.loads(file_path.read_text(encoding="utf-8")))

    def test_new_value_replaces_previous_value(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            file_path = Path(temporary_directory) / "understanding_level.json"
            store = UnderstandingLevelStore(file_path)

            store.set(4)
            store.set(9)

            self.assertEqual(store.get(), 9)
            self.assertEqual(json.loads(file_path.read_text(encoding="utf-8")), 9)

    def test_invalid_values_are_rejected(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            store = UnderstandingLevelStore(
                Path(temporary_directory) / "understanding_level.json"
            )

            for value in (True, 0, 13, 1.5, "4"):
                with self.subTest(value=value):
                    with self.assertRaises(ValueError):
                        store.set(value)

    def test_api_request_requires_an_integer_from_one_to_twelve(self):
        for value in (True, 0, 13, 1.5, "4"):
            with self.subTest(value=value):
                with self.assertRaises(ValidationError):
                    UnderstandingLevelUpdate(value=value)

        self.assertEqual(UnderstandingLevelUpdate(value=1).value, 1)
        self.assertEqual(UnderstandingLevelUpdate(value=12).value, 12)

    def test_invalid_stored_value_is_reported(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            file_path = Path(temporary_directory) / "understanding_level.json"
            file_path.write_text("13", encoding="utf-8")
            store = UnderstandingLevelStore(file_path)

            with self.assertRaises(RuntimeError):
                store.get()


if __name__ == "__main__":
    unittest.main()
