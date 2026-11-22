# EduBridge

EduBridge is a responsive, child-friendly educational textbook platform built for browsing NCERT-style textbooks, selecting subjects and chapters, and reading local PDF books.

The application uses:

- A React frontend for the interface and interactions.
- A FastAPI backend for textbook metadata and secure PDF delivery.
- A local JSON catalog to describe available textbooks.
- Local PDF files stored inside the backend project.

---

## 1. What Was Built

### 1.1 Frontend

1. Created a React application with Vite.
2. Added a kid-friendly EduBridge interface using balanced blue, yellow, mint, coral, and warm-white colors.
3. Added a fixed desktop sidebar and responsive mobile navigation.
4. Added these pages:
   - Home dashboard
   - Explore textbooks
   - My Learning
   - Progress
   - Chapter reader
5. Added a personalized welcome card and a Continue Learning section.
6. Added recently opened chapter cards.
7. Added mock streak, progress, badge, and revisit-topic UI.
8. Added class selection cards.
9. Added subject selection cards.
10. Added chapter cards with chapter number, title, and description.
11. Added back navigation for every browsing step.
12. Added responsive desktop, tablet, and mobile layouts.
13. Added Hint / Help and Simplify This buttons.
14. Clearly labeled sample hint and simplified explanations as mock UI data.
15. Added loading, empty, backend error, and retry states.

### 1.2 Backend

1. Created a separate FastAPI backend under `backend/`.
2. Added a health check endpoint.
3. Added endpoints for classes, subjects, chapters, and chapter metadata.
4. Added an endpoint for chapter PDF files.
5. Added CORS configuration for the local Vite frontend.
6. Added a JSON textbook catalog.
7. Added safe PDF path validation.
8. Prevented frontend and API requests from accessing files outside the textbook directory.
9. Included a sample local PDF for testing the PDF reader.

### 1.3 Frontend-Backend Integration

1. Created a centralized API utility in `src/services/api.js`.
2. Added `VITE_API_BASE_URL` for frontend API configuration.
3. Connected class cards to the backend classes endpoint.
4. Connected subject cards to the backend subjects endpoint.
5. Connected chapter cards to the backend chapters endpoint.
6. Connected chapter opening to the backend PDF endpoint.
7. Added browser PDF rendering through an iframe.

---

## 2. Project Location

The project is located at:

```text
C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0
```

Open this folder in VS Code before running the commands below.

---

## 3. Project Structure

```text
epics 3.0/
  README.md
  package.json
  vite.config.js
  .env
  src/
    App.jsx                 # Main pages and navigation
    App.css                 # EduBridge interface styles
    index.css               # Global CSS
    main.jsx                # React entry point
    data/
      catalog.js            # Mock dashboard and learning UI data
    services/
      api.js                # Central FastAPI client
  backend/
    requirements.txt
    README.md
    app/
      main.py               # FastAPI application
      config.py             # Catalog and textbook paths
      routes/
        textbooks.py        # REST endpoints
      services/
        textbook_service.py # Catalog and safe file access
    textbooks/
      catalog.json          # Local textbook catalog
      class-10/
        mathematics/
          relations-and-functions.pdf
```

### Data separation

- `src/data/catalog.js` contains only mock UI/dashboard catalog data.
- `backend/textbooks/catalog.json` contains real textbook catalog metadata.
- Files under `backend/textbooks/` are real local PDF books.
- Mock progress, streaks, and lesson completion values must not be interpreted as real student data.

---

## 4. Technology Used

### Frontend

- React 19
- Vite
- JavaScript
- HTML
- CSS
- Lucide React icons

### Backend

- Python
- FastAPI
- Uvicorn
- JSON local catalog

### No database or authentication

The project does not use:

- A database
- Login or signup
- Authentication
- AI or LLM services
- Cloud storage
- PDF uploads
- Payment systems

---

## 5. Prerequisites

Install the following:

1. Node.js and npm.
2. Python 3.
3. VS Code or another terminal.

Verify Node and npm:

```powershell
node --version
npm.cmd --version
```

PowerShell may block `npm.ps1` because script execution is disabled. This project uses `npm.cmd`, so npm works without changing the PowerShell execution policy.

---

## 6. Install the Frontend

1. Open PowerShell.
2. Move to the project:

```powershell
cd "C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0"
```

3. Install frontend dependencies:

```powershell
npm.cmd install
```

4. Confirm that the installation completes without dependency errors.

---

## 7. Install the Backend

You can use an existing virtual environment or create a new one.

### Option A: Create a new virtual environment

1. Move to the project:

```powershell
cd "C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0"
```

2. Create `.venv`:

```powershell
python -m venv .venv
```

3. Install backend dependencies:

```powershell
.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

### Option B: Use an existing virtual environment

Example:

```powershell
C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

Backend packages are listed in:

```text
backend/requirements.txt
```

---

## 8. Configure the Frontend API URL

The `.env` file should contain:

```text
VITE_API_BASE_URL=http://127.0.0.1:8001
```

This setting is used by:

```text
src/services/api.js
```

Do not change every component individually. Update `.env` to change the backend address.

Port `8001` is used because port `8000` may already be occupied by another application on the computer.

---

## 9. Start the Backend

1. Open a PowerShell terminal.
2. Move to the backend:

```powershell
cd "C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0\backend"
```

3. Start Uvicorn:

```powershell
C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

If you created `.venv` inside the project, use:

```powershell
..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

Keep this terminal running while using EduBridge.

---

## 10. Start the Frontend

1. Open a second PowerShell terminal.
2. Move to the project:

```powershell
cd "C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0"
```

3. Start Vite:

```powershell
npm.cmd run dev -- --host 127.0.0.1
```

4. Open:

```text
http://127.0.0.1:5173
```

---

## 11. Where to Add NCERT PDF Files

All PDF files must be placed inside:

```text
C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0\backend\textbooks
```

Recommended folder structure:

```text
backend/textbooks/
  class-6/
    mathematics/
    science/
  class-7/
    mathematics/
    science/
  class-10/
    mathematics/
    science/
```

Example PDF location:

```text
C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0\backend\textbooks\class-10\mathematics\real-numbers.pdf
```

Use simple filenames and avoid spaces when possible:

- `real-numbers.pdf`
- `polynomials.pdf`
- `chemical-reactions.pdf`

Do not place PDFs outside `backend/textbooks/`.

---

## 12. Add a PDF to the Catalog

### Step 1: Copy the PDF

Create the class and subject folders if needed, then copy the PDF into the final folder.

Example:

```text
backend/textbooks/class-10/mathematics/real-numbers.pdf
```

### Step 2: Open the catalog

Open:

```text
backend/textbooks/catalog.json
```

### Step 3: Add a chapter entry

Example:

```json
{
  "id": "class-10-math-1",
  "number": 1,
  "title": "Real Numbers",
  "description": "Learn about Euclid's division lemma and the fundamental theorem of arithmetic.",
  "pdf_file": "class-10/mathematics/real-numbers.pdf"
}
```

### Step 4: Set the relative PDF path

The `pdf_file` value must be relative to `backend/textbooks`.

Correct:

```text
class-10/mathematics/real-numbers.pdf
```

Incorrect:

```text
C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0\backend\textbooks\class-10\mathematics\real-numbers.pdf
```

Do not expose absolute paths to the frontend.

### Step 5: Restart FastAPI

Stop the backend with `Ctrl+C`, then start it again.

---

## 13. Catalog Example

```json
{
  "classes": [
    {
      "id": "class-10",
      "name": "Class 10",
      "subjects": [
        {
          "id": "mathematics-10",
          "name": "Mathematics",
          "chapters": [
            {
              "id": "class-10-math-1",
              "number": 1,
              "title": "Relations and Functions",
              "description": "Explore relations, functions, and their representations.",
              "pdf_file": "class-10/mathematics/relations-and-functions.pdf"
            }
          ]
        }
      ]
    }
  ]
}
```

Catalog rules:

1. Class IDs should be unique and URL-safe.
2. Subject IDs should be unique.
3. Chapter IDs should be unique.
4. The `pdf_file` value must point to an existing PDF.
5. Keep chapter numbers in ascending order.

---

## 14. API Endpoints

The backend runs at:

```text
http://127.0.0.1:8001
```

### Health check

```text
GET /api/health
```

Example:

```text
http://127.0.0.1:8001/api/health
```

### Available classes

```text
GET /api/classes
```

### Subjects for a class

```text
GET /api/classes/{class_id}/subjects
```

Example:

```text
http://127.0.0.1:8001/api/classes/class-10/subjects
```

### Chapters for a subject

```text
GET /api/subjects/{subject_id}/chapters
```

Example:

```text
http://127.0.0.1:8001/api/subjects/mathematics-10/chapters
```

### Chapter metadata

```text
GET /api/chapters/{chapter_id}
```

### Chapter PDF

```text
GET /api/chapters/{chapter_id}/pdf
```

Example:

```text
http://127.0.0.1:8001/api/chapters/class-10-math-1/pdf
```

### Swagger documentation

Open:

```text
http://127.0.0.1:8001/docs
```

---

## 15. How PDF Serving Works

1. The frontend sends a chapter ID.
2. FastAPI reads the matching chapter from `catalog.json`.
3. The backend combines the catalog value with `backend/textbooks/`.
4. It resolves the final local path.
5. It verifies that the PDF is inside `backend/textbooks/`.
6. It verifies that the PDF exists.
7. It serves the file as `application/pdf`.
8. The frontend opens the URL in an iframe.

The backend rejects:

- Unknown chapter IDs with `404`.
- Missing PDF files with `404`.
- Invalid or escaped file paths with `400`.

Absolute paths are never returned to the browser.

---

## 16. How CORS Works

The backend accepts requests from:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

The default setting is:

```text
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

To add another frontend address:

```powershell
$env:FRONTEND_ORIGINS="http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"
```

Restart the backend after changing this setting.

---

## 17. User Flow

1. Open the EduBridge homepage.
2. Select **Explore Books**.
3. Select a class.
4. Select a subject.
5. Select a chapter.
6. Select **Open**.
7. The backend metadata and PDF load.
8. Read the PDF in the chapter reader.
9. Use **Hint / Help** for the mock hint.
10. Use **Simplify This** for the mock simplified explanation.
11. Use **Back to chapters** to return to the chapter list.
12. Use **Home** to return to the dashboard.

---

## 18. Verification and Tests Run

The following checks were run during development:

1. Frontend production build:

```powershell
npm.cmd run build
```

2. Frontend lint:

```powershell
npm.cmd run lint
```

3. Backend Python syntax:

```powershell
C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics\.venv\Scripts\python.exe -m compileall -q backend\app
```

4. Backend health endpoint:

```text
GET /api/health
Status: 200
```

5. Swagger endpoint:

```text
GET /docs
Status: 200
```

6. PDF endpoint:

```text
GET /api/chapters/class-10-math-1/pdf
Status: 200
Content-Type: application/pdf
```

7. Invalid chapter endpoint:

```text
GET /api/chapters/not-real
Status: 404
```

8. Browser flow tested:

- Home page
- Explore books
- Class selection
- Subject selection
- Chapter selection
- Chapter PDF reader
- Hint button
- Simplify button
- Back navigation
- Backend unavailable retry state

---

## 19. Troubleshooting

### No classes appear

1. Confirm the backend is running.
2. Open `http://127.0.0.1:8001/api/health`.
3. Confirm the response is `{"status":"ok","service":"EduBridge"}`.
4. Restart the frontend if needed.

### PDF does not load

1. Confirm the PDF exists at the exact path in `catalog.json`.
2. Confirm `pdf_file` is relative to `backend/textbooks/`.
3. Open `/api/chapters/{chapter_id}/pdf` directly.
4. Confirm the chapter ID exists.
5. Restart FastAPI after catalog changes.

### Invalid chapter

1. Check that the chapter ID is present in `backend/textbooks/catalog.json`.
2. Make sure the ID is the same in both the subject and chapter.

### CORS error

1. Confirm Vite is running on `http://127.0.0.1:5173`.
2. Confirm the origin is included in `FRONTEND_ORIGINS`.
3. Restart FastAPI.

### Port already in use

1. Port `8001` may be occupied.
2. Stop the existing EduBridge backend.
3. Choose another available port.
4. Update `.env` with the new backend URL.
5. Restart both servers.

### Frontend build errors

Run:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run lint
```

### Backend import errors

1. Confirm the virtual environment is active or use its full Python path.
2. Reinstall dependencies:

```powershell
.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

3. Start Uvicorn from the `backend/` directory.

---

## 20. Common Commands

### Install frontend

```powershell
npm.cmd install
```

### Start frontend

```powershell
npm.cmd run dev -- --host 127.0.0.1
```

### Build frontend

```powershell
npm.cmd run build
```

### Run frontend lint

```powershell
npm.cmd run lint
```

### Start backend

```powershell
cd "C:\Users\gopup\OneDrive\Desktop\praval\vIT\epics 3.0\backend"
..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

### Check backend health

```text
http://127.0.0.1:8001/api/health
```

### Open Swagger

```text
http://127.0.0.1:8001/docs
```

---

## 21. Current Limitations

1. The currently included PDF is a sample local textbook file.
2. Progress, streak, learning, and badges are mock UI values.
3. Hint and Simplify actions are not connected to AI.
4. No database or student accounts are implemented.
5. The frontend does not upload PDFs.
6. PDF navigation is handled by the browser's native viewer controls.

---

## 22. Recommended Next Steps

1. Add the required NCERT PDF files under `backend/textbooks/`.
2. Update `backend/textbooks/catalog.json`.
3. Replace mock dashboard progress values when real progress functionality is added.
4. Add real chapter descriptions if required.
5. Optionally connect a PDF bookmark or chapter navigation system later.
