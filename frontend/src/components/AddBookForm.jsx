import { useState, useEffect } from 'react'
import './AddAuthorForm.css'

function AddBookForm({ isOpen, onClose, authors, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    publishedYear: '',
    genre: '',
    quantity: '0',
    authorId: ''
  })

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'Horror',
    'Biography',
    'History',
    'Science',
    'Philosophy',
    'Poetry',
    'Drama',
    'Comedy',
    'Adventure',
    'Young Adult',
    'Children\'s',
    'Self-Help',
    'Business',
    'Other'
  ]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authors.length > 0 && !formData.authorId) {
      setFormData(prev => ({ ...prev, authorId: authors[0].id.toString() }))
    }
  }, [authors])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          isbn: formData.isbn.trim() || undefined,
          publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
          genre: formData.genre || undefined,
          quantity: parseInt(formData.quantity) || 0,
          authorId: parseInt(formData.authorId),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create book')
      }

      const newBook = await response.json()
      
      // Reset form
      setFormData({ 
        title: '', 
        isbn: '', 
        publishedYear: '', 
        genre: '',
        quantity: '0',
        authorId: authors.length > 0 ? authors[0].id.toString() : '' 
      })
      onSuccess(newBook)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Book</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="author-form">
          <div className="form-group">
            <label htmlFor="title">
              Book Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter book title"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="authorId">
              Author <span className="required">*</span>
            </label>
            <select
              id="authorId"
              name="authorId"
              value={formData.authorId}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-select"
            >
              {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN (Optional)</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="publishedYear">Published Year (Optional)</label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder="e.g., 2023"
              min="1000"
              max="9999"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre (Optional)</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              disabled={loading}
              className="form-select"
            >
              <option value="">Select a genre...</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity">
              Quantity Available <span className="required">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="0"
              min="0"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading || !formData.title.trim() || !formData.authorId}
            >
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookForm

