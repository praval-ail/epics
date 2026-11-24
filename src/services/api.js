export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001'
).replace(/\/$/, '')

async function apiRequest(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const body = await response.json()
      message = body.detail || message
    } catch {
      // Keep the status-based message when the response is not JSON.
    }
    throw new Error(message)
  }
  return response.json()
}

async function apiGet(path) {
  return apiRequest(path)
}

async function apiPut(path, body) {
  return apiRequest(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export const textbookApi = {
  getHealth: () => apiGet('/api/health'),
  getClasses: () => apiGet('/api/classes'),
  getSubjects: (classId) => apiGet(`/api/classes/${encodeURIComponent(classId)}/subjects`),
  getChapters: (subjectId) => apiGet(`/api/subjects/${encodeURIComponent(subjectId)}/chapters`),
  getChapter: (chapterId) => apiGet(`/api/chapters/${encodeURIComponent(chapterId)}`),
  getPdfUrl: (chapterId) =>
    `${API_BASE_URL}/api/chapters/${encodeURIComponent(chapterId)}/pdf`,
  getUnderstandingLevel: () => apiGet('/api/preferences/understanding-level'),
  setUnderstandingLevel: (value) =>
    apiPut('/api/preferences/understanding-level', { value }),
}
