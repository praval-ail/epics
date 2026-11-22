from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.services.textbook_service import TextbookService

router = APIRouter(prefix="/api")
textbooks = TextbookService()


@router.get("/health")
def health():
    return {"status": "ok", "service": "EduBridge"}


@router.get("/classes")
def get_classes():
    return textbooks.get_classes()


@router.get("/classes/{class_id}/subjects")
def get_subjects(class_id: str):
    return textbooks.get_subjects(class_id)


@router.get("/subjects/{subject_id}/chapters")
def get_chapters(subject_id: str):
    return textbooks.get_chapters(subject_id)


@router.get("/chapters/{chapter_id}")
def get_chapter(chapter_id: str):
    return textbooks.get_chapter(chapter_id)


@router.get("/chapters/{chapter_id}/pdf")
def get_chapter_pdf(chapter_id: str):
    pdf_path = textbooks.get_chapter_pdf_path(chapter_id)
    return FileResponse(pdf_path, media_type="application/pdf", filename=pdf_path.name)
