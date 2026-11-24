import { useEffect, useMemo, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  GraduationCap,
  Home,
  Lightbulb,
  Menu,
  PieChart,
  Search,
  Sparkles,
  Trophy,
  X,
  Calculator,
  Library,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react'
import { mockCatalog } from './data/catalog'
import { textbookApi } from './services/api'
import './App.css'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore Books', icon: Library },
  { id: 'learning', label: 'My Learning', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: PieChart },
]

function getGradeFromClassName(className) {
  const match = className?.match(/\d+/)
  return match ? Number(match[0]) : 6
}

function Logo() {
  return (
    <button className="brand" type="button" onClick={() => window.edubridgeNavigate?.('home')} aria-label="Go to EduBridge home">
      <span className="brand-mark"><GraduationCap size={24} /></span>
      <span>EduBridge</span>
    </button>
  )
}

function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <>
      {open && <button className="nav-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-head">
          <Logo />
          <button className="icon-button sidebar-close" type="button" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={`nav-item ${page === id ? 'active' : ''}`}
              onClick={() => { setPage(id); setOpen(false) }}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-streak">
          <span className="streak-icon">🔥</span>
          <div><strong>4 day streak</strong><small>Keep it going!</small></div>
        </div>
      </aside>
    </>
  )
}

function Header({ setOpen }) {
  return (
    <header className="topbar">
      <button className="icon-button menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
      <div className="search-box">
        <Search size={18} />
        <input aria-label="Search textbooks" placeholder="Search for a topic..." />
      </div>
      <button className="profile-button" type="button" aria-label="Open profile">
        <span className="avatar">A</span>
        <span className="profile-name">Arin</span>
      </button>
    </header>
  )
}

function HomePage({ setPage, setSelectedChapter, setReaderOpen }) {
  const recent = mockCatalog[0].subjects[0].chapters
  const openChapter = (chapter) => {
    setSelectedChapter({ ...chapter, grade: getGradeFromClassName(mockCatalog[0].name) })
    setReaderOpen(true)
  }

  return (
    <main className="page home-page">
      <section className="welcome-card">
        <div className="welcome-copy">
          <span className="eyebrow">MONDAY, NOVEMBER 22</span>
          <h1>Ready for a new adventure, Arin?</h1>
          <p>Choose a lesson and make today count.</p>
          <button className="primary-button" type="button" onClick={() => setPage('explore')}>
            Explore textbooks <ArrowRight size={18} />
          </button>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="planet">★</div>
          <div className="book-illustration"><BookOpen size={58} /><span>Learn</span></div>
          <div className="art-spark spark-one">✦</div>
          <div className="art-spark spark-two">✦</div>
        </div>
      </section>

      <section className="home-grid">
        <div className="main-column">
          <div className="section-heading">
            <div><span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Continue learning</h2></div>
          </div>
          <button className="continue-card" type="button" onClick={() => openChapter(recent[0])}>
            <div className="subject-icon math"><Calculator size={25} /></div>
            <div className="continue-copy">
              <span>MATHEMATICS · CLASS 6</span>
              <h3>Chapter 1: Knowing Our Numbers</h3>
              <div className="progress-track"><span style={{ width: '80%' }} /></div>
              <small>80% complete</small>
            </div>
            <span className="round-arrow"><ArrowRight size={20} /></span>
          </button>

          <div className="section-heading recent-heading">
            <div><span className="eyebrow">YOUR LIBRARY</span><h2>Recently opened</h2></div>
            <button type="button" className="text-button" onClick={() => setPage('learning')}>View all <ChevronRight size={16} /></button>
          </div>
          <div className="recent-grid">
            {recent.slice(0, 3).map((chapter, index) => (
              <button className="recent-card" type="button" key={chapter.id} onClick={() => openChapter(chapter)}>
                <div className={`recent-cover cover-${index + 1}`}>
                  {index === 0 ? <Calculator size={28} /> : index === 1 ? <Sparkles size={28} /> : <BookOpen size={28} />}
                </div>
                <span>Class 6 · Math</span>
                <h3>{chapter.title}</h3>
                <div className="mini-progress"><span style={{ width: `${chapter.progress}%` }} /></div>
              </button>
            ))}
          </div>
        </div>

        <aside className="side-column">
          <section className="progress-card">
            <div className="card-title"><h3>Weekly progress</h3><Trophy size={20} /></div>
            <div className="progress-ring" style={{ '--progress': '68%' }}>
              <div><strong>68%</strong><span>Complete</span></div>
            </div>
            <p><strong>3 of 5</strong> lessons finished</p>
          </section>
          <section className="revisit-card">
            <div className="card-title"><h3>Topics to revisit</h3><RotateCcw size={18} /></div>
            <button type="button" onClick={() => openChapter(recent[2])}>
              <span className="topic-number">02</span>
              <div><strong>Place Value</strong><small>From Knowing Our Numbers</small></div>
              <ChevronRight size={16} />
            </button>
          </section>
        </aside>
      </section>
    </main>
  )
}

function ExplorePage({ setSelectedChapter, setReaderOpen }) {
  const [selectedClassId, setSelectedClassId] = useState('')
  const [selectedSubjectId, setSelectedSubjectId] = useState('')
  const [classes, setClasses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)

  useEffect(() => {
    let active = true
    textbookApi.getClasses()
      .then((items) => { if (active) setClasses(items) })
      .catch((reason) => { if (active) setError(reason.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const selectClass = async (schoolClass) => {
    setSelectedClass(schoolClass)
    setSelectedClassId(schoolClass.id)
    setSelectedSubjectId('')
    setSelectedSubject(null)
    setLoading(true)
    setError('')
    try {
      setSubjects(await textbookApi.getSubjects(schoolClass.id))
    } catch (reason) {
      setError(reason.message)
    } finally {
      setLoading(false)
    }
  }

  const selectSubject = async (subject) => {
    setSelectedSubject(subject)
    setSelectedSubjectId(subject.id)
    setLoading(true)
    setError('')
    try {
      setChapters(await textbookApi.getChapters(subject.id))
    } catch (reason) {
      setError(reason.message)
    } finally {
      setLoading(false)
    }
  }

  const retryClasses = () => {
    setLoading(true)
    setError('')
    textbookApi.getClasses()
      .then(setClasses)
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }

  return (
    <main className="page explore-page">
      <div className="page-heading">
        <div><span className="eyebrow">NCERT TEXTBOOKS</span><h1>Explore books</h1></div>
      </div>
      <div className="steps">
        <span className={selectedClassId ? 'done' : 'active'}><b>{selectedClassId ? '✓' : '1'}</b> Class</span>
        <i />
        <span className={selectedSubjectId ? 'done' : selectedClassId ? 'active' : ''}><b>{selectedSubjectId ? '✓' : '2'}</b> Subject</span>
        <i />
        <span className={selectedSubjectId ? 'active' : ''}><b>3</b> Chapter</span>
      </div>

      {!selectedClassId ? (
        <section>
          <h2>Which class are you studying?</h2>
          {loading ? (
            <div className="api-state">Loading available classes...</div>
          ) : error ? (
            <div className="api-state error-state">
              <strong>Could not load textbooks</strong>
              <p>{error}</p>
              <button type="button" className="secondary-button" onClick={retryClasses}>
                <RotateCcw size={17} /> Retry
              </button>
            </div>
          ) : classes.length ? (
            <div className="class-grid">
              {classes.map((item) => (
                <button type="button" className="class-card" key={item.id} onClick={() => selectClass(item)}>
                  <span className="class-badge">{item.name.replace('Class ', '')}</span>
                  <div><h3>{item.name}</h3><p>View subjects</p></div>
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          ) : (
            <div className="api-state"><strong>No classes are available yet.</strong></div>
          )}
        </section>
      ) : !selectedSubjectId ? (
        <section>
          <button className="back-link" type="button" onClick={() => { setSelectedClassId(''); setSelectedClass(null); setSubjects([]); setError('') }}><ArrowLeft size={17} /> Back to classes</button>
          <h2>Select a subject for {selectedClass?.name}</h2>
          {loading ? (
            <div className="api-state">Loading subjects...</div>
          ) : error ? (
            <div className="api-state error-state"><strong>Could not load subjects</strong><p>{error}</p></div>
          ) : subjects.length ? (
            <div className="subject-grid">
              {subjects.map((subject) => (
                <button type="button" className="subject-card" key={subject.id} onClick={() => selectSubject(subject)}>
                  <span className="subject-icon math"><Calculator size={28} /></span>
                  <h3>{subject.name}</h3>
                  <p>{subject.chapter_count} chapters</p>
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          ) : (
            <div className="api-state"><strong>No subjects are available for this class.</strong></div>
          )}
        </section>
      ) : (
        <section>
          <button className="back-link" type="button" onClick={() => setSelectedSubjectId('')}><ArrowLeft size={17} /> Back to subjects</button>
          <div className="chapter-heading">
            <div>
              <span className="eyebrow">{selectedClass?.name} · {selectedSubject?.name}</span>
              <h2>Chapters</h2>
            </div>
          </div>
          {loading ? (
            <div className="api-state">Loading chapters...</div>
          ) : error ? (
            <div className="api-state error-state"><strong>Could not load chapters</strong><p>{error}</p></div>
          ) : chapters.length ? (
            <div className="chapter-list">
              {chapters.map((chapter) => (
                <article className="chapter-card" key={chapter.id}>
                  <span className="chapter-number">{String(chapter.number).padStart(2, '0')}</span>
                  <div className="chapter-copy">
                    <h3>{chapter.title}</h3>
                    <p>{chapter.description}</p>
                  </div>
                  <button type="button" className="open-button" onClick={() => {
                    setSelectedChapter({
                      ...chapter,
                      grade: getGradeFromClassName(selectedClass?.name),
                      pdfUrl: textbookApi.getPdfUrl(chapter.id),
                    })
                    setReaderOpen(true)
                  }}>
                    <BookOpen size={17} /> Open
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="api-state"><strong>No chapters are available for this subject.</strong></div>
          )}
        </section>
      )}
    </main>
  )
}

function LearningPage({ setSelectedChapter, setReaderOpen }) {
  const chapters = mockCatalog.flatMap((item) =>
    item.subjects.flatMap((subject) =>
      subject.chapters.map((chapter) => ({
        ...chapter,
        grade: getGradeFromClassName(item.name),
      })),
    ),
  )
  return (
    <main className="page">
      <div className="page-heading"><div><span className="eyebrow">YOUR LIBRARY</span><h1>My learning</h1></div></div>
      <div className="learning-grid">
        {chapters.map((chapter) => (
          <article className="learning-card" key={chapter.id}>
            <span className="learning-badge">{chapter.progress ? `${chapter.progress}% complete` : 'New'}</span>
            <BookOpen size={32} />
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
            <button type="button" className="open-button" onClick={() => { setSelectedChapter(chapter); setReaderOpen(true) }}>
              {chapter.progress ? 'Continue' : 'Start'} <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>
    </main>
  )
}

function ProgressPage() {
  return (
    <main className="page">
      <div className="page-heading"><div><span className="eyebrow">YOUR JOURNEY</span><h1>Learning progress</h1></div></div>
      <div className="progress-page-grid">
        <section className="stat-card"><span className="stat-icon yellow"><Trophy size={24} /></span><strong>4</strong><p>Day streak <small>(mock)</small></p></section>
        <section className="stat-card"><span className="stat-icon mint"><CheckCircle2 size={24} /></span><strong>3</strong><p>Lessons completed <small>(mock)</small></p></section>
        <section className="stat-card"><span className="stat-icon blue"><BookOpen size={24} /></span><strong>68%</strong><p>Weekly goal <small>(mock)</small></p></section>
      </div>
      <section className="encouragement-card">
        <span><Sparkles size={28} /></span>
        <div><h2>Wonderful effort, Arin!</h2><p>You are building a strong learning habit. One lesson at a time is all it takes.</p></div>
      </section>
    </main>
  )
}

function PdfDocument({ url, title }) {
  const pagesRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    let loadingTask
    let renderTask
    const pages = pagesRef.current
    if (!pages) return
    pages.replaceChildren()
    setLoading(true)
    setError('')

    const renderPdf = async () => {
      try {
        loadingTask = pdfjsLib.getDocument(url)
        const document = await loadingTask.promise
        for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
          const page = await document.getPage(pageNumber)
          if (cancelled) return

          const baseViewport = page.getViewport({ scale: 1 })
          const scale = Math.min(1.5, Math.max(320, pages.clientWidth - 32) / baseViewport.width)
          const viewport = page.getViewport({ scale })
          const canvas = window.document.createElement('canvas')
          const context = canvas.getContext('2d')
          if (!context) throw new Error('This browser could not render the PDF page.')

          canvas.width = Math.ceil(viewport.width)
          canvas.height = Math.ceil(viewport.height)
          canvas.setAttribute('role', 'img')
          canvas.setAttribute('aria-label', `${title}, page ${pageNumber}`)
          pages.appendChild(canvas)

          renderTask = page.render({ canvasContext: context, viewport })
          await renderTask.promise
          if (cancelled) return
        }
        setLoading(false)
      } catch (reason) {
        if (cancelled) return
        pages.replaceChildren()
        setError(reason instanceof Error ? reason.message : String(reason))
        setLoading(false)
      }
    }

    renderPdf()
    return () => {
      cancelled = true
      if (renderTask) renderTask.cancel()
      if (loadingTask) {
        void loadingTask.destroy().catch((reason) => {
          console.error('Could not release the PDF document', reason)
        })
      }
      pages.replaceChildren()
    }
  }, [url, title])

  return (
    <section className="pdf-reader" aria-label={`${title} textbook PDF`}>
      {loading && <div className="pdf-loading" aria-live="polite">Loading chapter PDF...</div>}
      {error && (
        <div className="api-state error-state">
          <strong>The PDF could not be loaded</strong>
          <p>{error}</p>
        </div>
      )}
      <div className="pdf-pages" ref={pagesRef} />
    </section>
  )
}

function Reader({ chapter, setReaderOpen, setPage }) {
  const [helpOpen, setHelpOpen] = useState(false)
  const [simplified, setSimplified] = useState(false)
  const initialGrade = Number(chapter.grade)
  const [knowledgeGrade, setKnowledgeGrade] = useState(() => (
    Number.isInteger(initialGrade) && initialGrade >= 1 && initialGrade <= 12 ? initialGrade : 6
  ))
  const [preferenceReady, setPreferenceReady] = useState(false)
  const [preferenceStatus, setPreferenceStatus] = useState('loading')
  const [preferenceError, setPreferenceError] = useState('')
  const userChangedLevel = useRef(false)

  useEffect(() => {
    let active = true
    textbookApi.getUnderstandingLevel()
      .then(({ value }) => {
        if (!active) return
        if (value !== null && !userChangedLevel.current) setKnowledgeGrade(value)
        setPreferenceStatus(userChangedLevel.current ? 'pending' : 'idle')
      })
      .catch((reason) => {
        if (!active) return
        setPreferenceError(`Could not load the saved level: ${reason.message}`)
        setPreferenceStatus('error')
      })
      .finally(() => {
        if (active) setPreferenceReady(true)
      })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!preferenceReady || !userChangedLevel.current) return
    const timer = setTimeout(async () => {
      setPreferenceStatus('saving')
      setPreferenceError('')
      try {
        await textbookApi.setUnderstandingLevel(knowledgeGrade)
        setPreferenceStatus('saved')
      } catch (reason) {
        setPreferenceError(`Could not save the selected level: ${reason.message}`)
        setPreferenceStatus('error')
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [knowledgeGrade, preferenceReady])

  const preferenceMessage = {
    loading: 'Loading saved level...',
    pending: 'Saving shortly...',
    saving: 'Saving...',
    saved: 'Saved',
    error: preferenceError,
  }[preferenceStatus]

  return (
    <main className="reader-page">
      <header className="reader-header">
        <button type="button" className="back-link" onClick={() => setReaderOpen(false)}><ArrowLeft size={17} /> Back to chapters</button>
        <div className="reader-title"><span>Chapter {String(chapter.number).padStart(2, '0')}</span><h1>{chapter.title}</h1></div>
        <button type="button" className="home-button" onClick={() => { setReaderOpen(false); setPage('home') }}><Home size={17} /> Home</button>
      </header>
      <div className="reader-layout">
        <aside className="reader-tools">
          <div className="knowledge-level">
            <div className="knowledge-level-heading">
              <label htmlFor="knowledge-grade">Knowledge level</label>
              <output htmlFor="knowledge-grade">Grade {knowledgeGrade}</output>
            </div>
            <input
              id="knowledge-grade"
              type="range"
              min="1"
              max="12"
              step="1"
              value={knowledgeGrade}
              aria-valuetext={`Grade ${knowledgeGrade}`}
              onChange={(event) => {
                userChangedLevel.current = true
                setPreferenceError('')
                setPreferenceStatus('pending')
                setKnowledgeGrade(Number(event.target.value))
              }}
            />
            <div className="knowledge-level-range"><span>Grade 1</span><span>Grade 12</span></div>
            {preferenceMessage && (
              <p
                className={`knowledge-level-status${preferenceStatus === 'error' ? ' error' : ''}`}
                role={preferenceStatus === 'error' ? 'alert' : 'status'}
              >
                {preferenceMessage}
              </p>
            )}
          </div>
          <button type="button" className={helpOpen ? 'active' : ''} onClick={() => setHelpOpen(!helpOpen)}><CircleHelp size={19} /> Hint / Help</button>
          <button type="button" className={simplified ? 'active' : ''} onClick={() => setSimplified(!simplified)}><Lightbulb size={19} /> Simplify this</button>
          {helpOpen && <div className="mock-note"><strong>Sample hint</strong><p>This is a mock explanation. Live AI help is not connected.</p></div>}
          {simplified && <div className="mock-note"><strong>Simplified sample</strong><p>Numbers can be grouped by place value to make very large numbers easier to read.</p></div>}
        </aside>
        <article className="lesson-content">
          {chapter.pdfUrl ? (
            <PdfDocument url={chapter.pdfUrl} title={chapter.title} />
          ) : null}
          <div className="lesson-intro">
            <span className="eyebrow">CHAPTER OVERVIEW</span>
            <h2>{chapter.title}</h2>
            <p>{chapter.description}</p>
          </div>
          <section className="concept-box">
            <span>KEY CONCEPT</span>
            <h3>Understand the idea</h3>
            <p>Break a big idea into smaller parts. Look for patterns, compare examples, and explain the answer in your own words.</p>
          </section>
          <section className="example-box">
            <h3>Try an example</h3>
            <div className="example-question">
              <span>EXAMPLE</span>
              <p>Read the number 5,30,278 aloud. What does each group of digits mean?</p>
            </div>
          </section>
          <div className="reader-navigation">
            <button type="button" className="secondary-button" disabled><ArrowLeft size={17} /> Previous</button>
            <button type="button" className="primary-button">Complete chapter <CheckCircle2 size={17} /></button>
          </div>
        </article>
      </div>
    </main>
  )
}

function App() {
  const [page, setPage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [readerOpen, setReaderOpen] = useState(false)

  useEffect(() => {
    window.edubridgeNavigate = setPage
    return () => { delete window.edubridgeNavigate }
  }, [])

  const content = useMemo(() => {
    if (readerOpen && selectedChapter) {
      return <Reader chapter={selectedChapter} setReaderOpen={setReaderOpen} setPage={setPage} />
    }
    if (page === 'explore') return <ExplorePage setSelectedChapter={setSelectedChapter} setReaderOpen={setReaderOpen} />
    if (page === 'learning') return <LearningPage setSelectedChapter={setSelectedChapter} setReaderOpen={setReaderOpen} />
    if (page === 'progress') return <ProgressPage />
    return <HomePage setPage={setPage} setSelectedChapter={setSelectedChapter} setReaderOpen={setReaderOpen} />
  }, [page, readerOpen, selectedChapter])

  return (
    <div className="app-shell">
      {!readerOpen && <Sidebar page={page} setPage={setPage} open={menuOpen} setOpen={setMenuOpen} />}
      <div className={`app-main ${readerOpen ? 'reader-main' : ''}`}>
        {!readerOpen && <Header setOpen={setMenuOpen} />}
        {content}
      </div>
    </div>
  )
}

export default App
