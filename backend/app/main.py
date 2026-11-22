import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.textbooks import router

app = FastAPI(title="EduBridge API", version="1.0.0")

frontend_origins = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in frontend_origins],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(router)
