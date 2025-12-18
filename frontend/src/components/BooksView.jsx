import { useState } from 'react'
import './BooksView.css'
import AddBookForm from './AddBookForm'
import EditBookForm from './EditBookForm'

function BooksView({ books, authors, onBookAdded, onBookUpdated, onBookDeleted }) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [deletingBookId, setDeletingBookId] = useState(null)

  // Get unique authors list
  const uniqueAuthors = authors || Array.from(
    new Map(books.map(book => [book.author.id, book.author])).values()
  )

  const handleBookAdded = (newBook) => {
    setIsAddFormOpen(false)
    if (onBookAdded) {
      onBookAdded(newBook)
    }
  }

  const handleBookUpdated = (updatedBook) => {
    setEditingBook(null)
    if (onBookUpdated) {
      onBookUpdated(updatedBook)
    }
  }

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return
    }

    setDeletingBookId(bookId)
    try {
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete book')
      }

      if (onBookDeleted) {
        onBookDeleted(bookId)
      }
    } catch (error) {
      alert('Error deleting book: ' + error.message)
    } finally {
      setDeletingBookId(null)
    }
  }

  // Group books by author
  const booksByAuthor = books.reduce((acc, book) => {
    const authorName = book.author.name
    if (!acc[authorName]) {
      acc[authorName] = {
        author: book.author,
        books: []
      }
    }
    acc[authorName].books.push(book)
    return acc
  }, {})

  // Sort authors alphabetically
  const sortedAuthors = Object.keys(booksByAuthor).sort()

  return (
    <div className="books-view">
      <div className="view-header">
        <h2 className="view-title">📖 Books by Author</h2>
        <button 
          className="add-author-button"
          onClick={() => setIsAddFormOpen(true)}
        >
          + Add Book
        </button>
      </div>

      <AddBookForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        authors={uniqueAuthors}
        onSuccess={handleBookAdded}
      />

      <EditBookForm
        isOpen={!!editingBook}
        onClose={() => setEditingBook(null)}
        book={editingBook}
        authors={uniqueAuthors}
        onSuccess={handleBookUpdated}
      />
      
      <div className="books-container">
        {sortedAuthors.map((authorName) => {
          const { author, books: authorBooks } = booksByAuthor[authorName]
          return (
            <div key={author.id} className="author-section">
              <div className="author-header">
                <h3 className="author-name">{author.name}</h3>
                {author.bio && (
                  <p className="author-bio">{author.bio}</p>
                )}
              </div>
              <div className="books-grid">
                {authorBooks.map((book) => (
                  <div key={book.id} className="book-card">
                    <div className="book-actions">
                      <button
                        className="action-button edit-button"
                        onClick={() => setEditingBook(book)}
                        title="Edit book"
                      >
                        ✏️
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDelete(book.id)}
                        disabled={deletingBookId === book.id}
                        title="Delete book"
                      >
                        {deletingBookId === book.id ? '⏳' : '🗑️'}
                      </button>
                    </div>
                    <div className="book-header">
                      <h4 className="book-title">{book.title}</h4>
                      {book.publishedYear && (
                        <span className="book-year">{book.publishedYear}</span>
                      )}
                    </div>
                    <div className="book-details">
                      {book.genre && (
                        <div className="book-genre">
                          <span className="genre-badge">📚 {book.genre}</span>
                        </div>
                      )}
                      {book.isbn && (
                        <p className="book-isbn">ISBN: {book.isbn}</p>
                      )}
                      <div className="book-quantity">
                        <span className={`quantity-badge ${book.quantity === 0 ? 'out-of-stock' : book.quantity < 5 ? 'low-stock' : 'in-stock'}`}>
                          📦 {book.quantity} {book.quantity === 1 ? 'copy' : 'copies'} available
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BooksView

