import { useState, useEffect } from 'react'
import './AddAuthorForm.css'

function EditAuthorForm({ isOpen, onClose, author, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    bio: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || '',
        bio: author.bio || ''
      })
    }
  }, [author])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/authors/${author.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          bio: formData.bio.trim() || undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update author')
      }

      const updatedAuthor = await response.json()
      onSuccess(updatedAuthor)
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

  if (!isOpen || !author) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Author</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="author-form">
          <div className="form-group">
            <label htmlFor="name">
              Author Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter author name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biography (Optional)</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter author biography"
              rows="4"
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
              disabled={loading || !formData.name.trim()}
            >
              {loading ? 'Updating...' : 'Update Author'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAuthorForm

