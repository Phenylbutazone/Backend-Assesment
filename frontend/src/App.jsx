import { useState, useEffect } from 'react'
import './App.css'
import BooksView from './components/BooksView'
import AuthorsView from './components/AuthorsView'

const API_BASE = 'http://localhost:3000'

function App() {
  const [view, setView] = useState('books')
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [booksRes, authorsRes] = await Promise.all([
        fetch(`${API_BASE}/books`),
        fetch(`${API_BASE}/authors`)
      ])

      if (!booksRes.ok || !authorsRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const booksData = await booksRes.json()
      const authorsData = await authorsRes.json()

      setBooks(booksData)
      setAuthors(authorsData)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading library data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchData}>Retry</button>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Library Management System</h1>
        <nav className="nav-tabs">
          <button
            className={view === 'books' ? 'active' : ''}
            onClick={() => setView('books')}
          >
            Books
          </button>
          <button
            className={view === 'authors' ? 'active' : ''}
            onClick={() => setView('authors')}
          >
            Authors
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === 'books' ? (
          <BooksView 
            books={books}
            authors={authors}
            onBookAdded={fetchData}
            onBookUpdated={fetchData}
            onBookDeleted={fetchData}
          />
        ) : (
          <AuthorsView 
            authors={authors} 
            onAuthorAdded={fetchData}
            onAuthorUpdated={fetchData}
            onAuthorDeleted={fetchData}
          />
        )}
      </main>
    </div>
  )
}

export default App

