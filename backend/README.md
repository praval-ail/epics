# EduBridge Backend

## Start

```powershell
Set-Location backend
C:\path\to\python.exe -m pip install -r requirements.txt
C:\path\to\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

## Test

- Health: `http://127.0.0.1:8001/api/health`
- Classes: `http://127.0.0.1:8001/api/classes`
- Swagger: `http://127.0.0.1:8001/docs`

The catalog is stored in `textbooks/catalog.json`. `app/services/textbook_service.py` reads it and restricts PDF access to catalog entries resolved inside `textbooks/`.
