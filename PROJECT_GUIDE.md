# EduBridge Project Guide

## What this project does

EduBridge is a textbook-learning web app. Learners can explore classes, subjects, and chapters, read textbook PDFs in a chapter reader, and choose an understanding level from 1 to 12. The current understanding-level preference is stored locally by the backend; it does not yet change the lesson content.

## Technology stack

### Frontend

- React 19 with JavaScript and JSX
- Vite for development and production builds
- CSS for layout and styling
- Lucide React for icons
- PDF.js (`pdfjs-dist`) to render textbook pages inside the app
- The browser Fetch API for frontend-to-backend requests

### Backend

- Python with FastAPI
- Uvicorn as the ASGI server
- Pydantic for request validation
- FastAPI CORS middleware for local frontend access
- JSON files for the textbook catalog and the temporary understanding-level preference

There is currently no database, authentication system, or LLM integration.

## Project layout

```text
src/
  App.jsx                 Main pages and chapter reader
  App.css                 App and reader styles
  main.jsx                React entry point
  data/catalog.js         Mock data used by dashboard/learning views
  services/api.js         Frontend API client
backend/
  app/
    main.py               FastAPI app, CORS, and router registration
    config.py             Backend data and textbook paths
    routes/
      textbooks.py        Textbook/catalog/PDF endpoints
      preferences.py      Understanding-level endpoints
    services/
      textbook_service.py Reads the textbook catalog and resolves PDF paths
      understanding_level_store.py
                            Reads/writes the local preference JSON file
  textbooks/
    catalog.json          Textbook catalog
    ...                   Textbook PDFs referenced by the catalog
  data/
    understanding_level.json
                            Generated local preference file
  tests/
    test_understanding_level_store.py
                            Preference storage and validation tests
```

The preference file is ignored by Git so a local learner setting is not committed.

## How the app works

1. The React app is served by Vite.
2. The **Explore Books** page requests classes, subjects, and chapters from the FastAPI backend.
3. Opening a chapter displays its details and requests its PDF. PDF.js fetches the PDF from the backend and renders its pages in the reader.
4. When the reader opens, the frontend requests the saved understanding level. If a number has been saved, it restores that slider value.
5. Moving the slider updates the UI immediately. After the value stops changing for 500 ms, the frontend sends it to the backend.
6. FastAPI validates that the request contains an integer from 1 through 12. The storage service writes the raw JSON number to disk, replacing the previous value.
7. Reopening a chapter retrieves the same value from the JSON file. It remains available across frontend reloads and backend restarts.

If no value has been selected yet, the file contains JSON `null` and the existing frontend default remains in use.

## API

The local API base URL defaults to `http://127.0.0.1:8001`. The frontend can override it with `VITE_API_BASE_URL`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Backend health check |
| `GET` | `/api/classes` | List available classes |
| `GET` | `/api/classes/{class_id}/subjects` | List subjects for a class |
| `GET` | `/api/subjects/{subject_id}/chapters` | List chapters for a subject |
| `GET` | `/api/chapters/{chapter_id}` | Get chapter details |
| `GET` | `/api/chapters/{chapter_id}/pdf` | Serve a chapter PDF inline |
| `GET` | `/api/preferences/understanding-level` | Read the saved level, or `{"value": null}` if unset |
| `PUT` | `/api/preferences/understanding-level` | Save a level |

Preference updates use this JSON shape:

```json
{ "value": 8 }
```

The successful response has the same shape. Values outside 1–12, non-integers, and other invalid inputs receive HTTP `422`. The interactive API documentation is available at `http://127.0.0.1:8001/docs`.

## Run locally

Run the frontend and backend in separate terminals.

### Frontend

From the project root:

```powershell
npm ci
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173`.

### Backend

From the `backend` directory, use the Python interpreter available on your machine:

```powershell
C:\path\to\python.exe -m pip install -r requirements.txt
C:\path\to\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

Replace `C:\path\to\python.exe` with the path to your Python executable. The API health check is at `http://127.0.0.1:8001/api/health`.

The backend permits the default Vite origins `http://localhost:5173` and `http://127.0.0.1:5173`. Set `FRONTEND_ORIGINS` to a comma-separated list if the frontend uses different origins.

## Build, lint, and tests

From the project root:

```powershell
npm run build
npm run lint
```

From the `backend` directory:

```powershell
C:\path\to\python.exe -m unittest discover -s tests -v
```

## Current scope and limitations

- The Explore textbook catalog and chapter PDFs are served by the backend.
- Home, dashboard/progress, and My Learning views contain mock data.
- The reader's hint and simplification examples are placeholders.
- The understanding-level preference is stored as one local value shared by this backend instance. There are no users or per-account settings yet.
- The slider currently stores only a number; there is no content adaptation or AI processing.
- The JSON file is a temporary persistence layer. It can later be replaced behind the same preference API without changing the frontend contract.
