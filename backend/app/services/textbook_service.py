import json
from pathlib import Path
from fastapi import HTTPException

from app.config import CATALOG_FILE, TEXTBOOK_DIR


class TextbookService:
    def __init__(self):
        self.catalog = self._load_catalog()

    def _load_catalog(self):
        if not CATALOG_FILE.exists():
            raise RuntimeError(f"Catalog file not found: {CATALOG_FILE}")
        with CATALOG_FILE.open("r", encoding="utf-8") as catalog_file:
            return json.load(catalog_file)

    def get_classes(self):
        return [
            {"id": item["id"], "name": item["name"]}
            for item in self.catalog["classes"]
        ]

    def get_subjects(self, class_id):
        school_class = self._find_class(class_id)
        return [
            {
                "id": subject["id"],
                "name": subject["name"],
                "chapter_count": len(subject["chapters"]),
            }
            for subject in school_class["subjects"]
        ]

    def get_chapters(self, subject_id):
        subject = self._find_subject(subject_id)
        return [
            self._chapter_summary(chapter)
            for chapter in subject["chapters"]
        ]

    def get_chapter(self, chapter_id):
        chapter = self._find_chapter(chapter_id)
        subject = self._find_subject_for_chapter(chapter_id)
        school_class = self._find_class_for_subject(subject["id"])
        return {
            **self._chapter_summary(chapter),
            "class_id": school_class["id"],
            "class_name": school_class["name"],
            "subject_id": subject["id"],
            "subject_name": subject["name"],
        }

    def get_chapter_pdf_path(self, chapter_id):
        chapter = self._find_chapter(chapter_id)
        pdf_path = (TEXTBOOK_DIR / chapter["pdf_file"]).resolve()
        textbook_root = TEXTBOOK_DIR.resolve()

        if textbook_root not in pdf_path.parents:
            raise HTTPException(status_code=400, detail="Invalid textbook file path")
        if not pdf_path.is_file():
            raise HTTPException(status_code=404, detail="Chapter PDF not found")
        return pdf_path

    def _find_class(self, class_id):
        for school_class in self.catalog["classes"]:
            if school_class["id"] == class_id:
                return school_class
        raise HTTPException(status_code=404, detail="Class not found")

    def _find_subject(self, subject_id):
        for school_class in self.catalog["classes"]:
            for subject in school_class["subjects"]:
                if subject["id"] == subject_id:
                    return subject
        raise HTTPException(status_code=404, detail="Subject not found")

    def _find_chapter(self, chapter_id):
        for school_class in self.catalog["classes"]:
            for subject in school_class["subjects"]:
                for chapter in subject["chapters"]:
                    if chapter["id"] == chapter_id:
                        return chapter
        raise HTTPException(status_code=404, detail="Chapter not found")

    def _find_subject_for_chapter(self, chapter_id):
        for school_class in self.catalog["classes"]:
            for subject in school_class["subjects"]:
                if any(chapter["id"] == chapter_id for chapter in subject["chapters"]):
                    return subject
        raise HTTPException(status_code=404, detail="Chapter not found")

    def _find_class_for_subject(self, subject_id):
        for school_class in self.catalog["classes"]:
            if any(subject["id"] == subject_id for subject in school_class["subjects"]):
                return school_class
        raise HTTPException(status_code=404, detail="Subject not found")

    def _chapter_summary(self, chapter):
        return {
            "id": chapter["id"],
            "number": chapter["number"],
            "title": chapter["title"],
            "description": chapter["description"],
        }
