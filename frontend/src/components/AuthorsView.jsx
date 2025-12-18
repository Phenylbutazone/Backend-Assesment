import { useState } from 'react'
import './AuthorsView.css'
import AddAuthorForm from './AddAuthorForm'
import EditAuthorForm from './EditAuthorForm'

function AuthorsView({ authors, onAuthorAdded, onAuthorUpdated, onAuthorDeleted }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [deletingAuthorId, setDeletingAuthorId] = useState(null)

  const handleAuthorAdded = (newAuthor) => {
    setIsFormOpen(false)
    if (onAuthorAdded) {
      onAuthorAdded(newAuthor)
    }
  }

  const handleAuthorUpdated = (updatedAuthor) => {
    setEditingAuthor(null)
    if (onAuthorUpdated) {
      onAuthorUpdated(updatedAuthor)
    }
  }

  const handleDelete = async (authorId) => {
    if (!window.confirm('Are you sure you want to delete this author? This will also delete all their books.')) {
      return
    }

    setDeletingAuthorId(authorId)
    try {
      const response = await fetch(`http://localhost:3000/authors/${authorId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete author')
      }

      if (onAuthorDeleted) {
        onAuthorDeleted(authorId)
      }
    } catch (error) {
      alert('Error deleting author: ' + error.message)
    } finally {
      setDeletingAuthorId(null)
    }
  }

  return (
    <div className="authors-view">
      <div className="view-header">
        <h2 className="view-title">✍️ Authors</h2>
        <button 
          className="add-author-button"
          onClick={() => setIsFormOpen(true)}
        >
          + Add Author
        </button>
      </div>
      
      <AddAuthorForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleAuthorAdded}
      />
      
      <EditAuthorForm
        isOpen={!!editingAuthor}
        onClose={() => setEditingAuthor(null)}
        author={editingAuthor}
        onSuccess={handleAuthorUpdated}
      />
      
      <div className="authors-grid">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <div className="author-avatar">
              {author.name.charAt(0).toUpperCase()}
            </div>
            <div className="author-actions">
              <button
                className="action-button edit-button"
                onClick={() => setEditingAuthor(author)}
                title="Edit author"
              >
                ✏️
              </button>
              <button
                className="action-button delete-button"
                onClick={() => handleDelete(author.id)}
                disabled={deletingAuthorId === author.id}
                title="Delete author"
              >
                {deletingAuthorId === author.id ? '⏳' : '🗑️'}
              </button>
            </div>
            <h3 className="author-name">{author.name}</h3>
            {author.bio && (
              <p className="author-bio">{author.bio}</p>
            )}
            <div className="author-stats">
              <span className="stat-item">
                📚 {author.books?.length || 0} {author.books?.length === 1 ? 'Book' : 'Books'}
              </span>
            </div>
            {author.books && author.books.length > 0 && (
              <div className="author-books">
                <h4>Books:</h4>
                <ul>
                  {author.books.map((book) => (
                    <li key={book.id}>
                      {book.title}
                      {book.publishedYear && (
                        <span className="book-year-badge"> ({book.publishedYear})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuthorsView

