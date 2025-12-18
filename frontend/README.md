# Library Management Frontend

A modern React frontend for organizing and displaying books and authors.

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Make sure the backend server is running on port 3000:**
```bash
cd ../backend
npm start:dev
```

3. **Start the frontend development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## ✨ Features

- **Books View**: Displays all books organized by author, sorted by publication year
- **Authors View**: Shows all authors with their books in a card layout
- **Modern Design**: Beautiful gradient UI with smooth animations
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Real-time Data**: Fetches data from the backend API

## 📱 Views

### Books View
- Books are grouped by author
- Within each author, books are sorted by publication year (oldest first)
- Each book card shows title, publication year, and ISBN

### Authors View
- Author cards with avatar initials
- Author bio and book count
- List of all books by each author

## 🛠️ Development

The frontend uses:
- **React 18** for UI components
- **Vite** for fast development and building
- **Modern CSS** with gradients and animations

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```
