from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
TEXTBOOK_DIR = BASE_DIR / "textbooks"
CATALOG_FILE = TEXTBOOK_DIR / "catalog.json"
DATA_DIR = BASE_DIR / "data"
UNDERSTANDING_LEVEL_FILE = DATA_DIR / "understanding_level.json"
