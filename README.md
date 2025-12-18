# Library Management System

A full-stack library management application built with NestJS (backend) and React (frontend), featuring complete CRUD operations for managing books and authors.

## 🚀 Features

- **Books Management**
  - Create, read, update, and delete books
  - Track book quantity/availability
  - Categorize books by genre
  - View books organized by author
  - Search and filter capabilities

- **Authors Management**
  - Create, read, update, and delete authors
  - Author biography support
  - View all books by each author

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Phenylbutazone/Backend-Assesment.git
cd Backend-Assesment
```

### 2. Database Setup

1. Create a PostgreSQL database:
```bash
createdb nestdb
# Or using psql:
psql -U postgres
CREATE DATABASE nestdb;
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Create a `.env` file in the `backend` directory:
```bash
cp .env.example .env  # If you have an example file
# Or create manually:
```

4. Add your database connection string to `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/nestdb"
```

Replace `username`, `password`, and `nestdb` with your actual PostgreSQL credentials and database name.

### 3. Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Run database migrations:
```bash
npx prisma migrate deploy
```

3. (Optional) Seed the database with sample data:
```bash
npm run seed
```

### 4. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

## ▶️ How to Run the Application

### Running the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Start the development server:
```bash
npm run start:dev
```

The backend API will be available at `http://localhost:3000`

### Running the Frontend

1. Open a new terminal window/tab
2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

### Accessing the Application

Once both servers are running:
- **Frontend**: Open your browser and navigate to `http://localhost:5173`
- **Backend API**: Available at `http://localhost:3000`

## 📚 API Endpoints

### Books
- `GET /books` - Get all books (organized by author)
- `GET /books/:id` - Get a specific book
- `POST /books` - Create a new book
- `PATCH /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

### Authors
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get a specific author
- `POST /authors` - Create a new author
- `PATCH /authors/:id` - Update an author
- `DELETE /authors/:id` - Delete an author

## 🏗️ Project Structure

```
Backend-Assesment/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Database migrations
│   ├── src/
│   │   ├── books/                 # Books module (controller, service)
│   │   ├── authors/               # Authors module (controller, service)
│   │   ├── users/                 # Users module
│   │   ├── prisma/                # Prisma service and module
│   │   └── main.ts                # Application entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BooksView.jsx      # Books display component
│   │   │   ├── AuthorsView.jsx    # Authors display component
│   │   │   ├── AddBookForm.jsx    # Add book form
│   │   │   ├── EditBookForm.jsx   # Edit book form
│   │   │   ├── AddAuthorForm.jsx  # Add author form
│   │   │   └── EditAuthorForm.jsx # Edit author form
│   │   ├── App.jsx                # Main application component
│   │   └── main.jsx               # Frontend entry point
│   └── package.json
└── README.md
```

## 💡 Approach & Design Decisions

### Backend Architecture

1. **NestJS Framework**: Chose NestJS for its modular architecture, built-in TypeScript support, and excellent scalability. The framework's dependency injection system makes the code more maintainable and testable.

2. **Prisma ORM**: Selected Prisma for its type-safe database access, excellent migration system, and intuitive API. It eliminates the need for manual SQL queries and provides excellent developer experience.

3. **RESTful API Design**: Implemented standard REST endpoints following best practices. Each resource (books, authors) has its own module with controller and service, promoting separation of concerns.

4. **Database Schema**:
   - **Books**: Includes title, ISBN, published year, genre, quantity, and author relationship
   - **Authors**: Includes name, biography, and relationship to books
   - **Cascade Deletion**: When an author is deleted, all their books are automatically deleted

5. **Error Handling**: Implemented proper error handling with try-catch blocks and meaningful error messages. The service layer handles business logic while controllers handle HTTP concerns.

### Frontend Architecture

1. **React with Hooks**: Used functional components with React hooks for state management, making the code more modern and easier to understand.

2. **Component-Based Design**: Created reusable components (forms, views) that can be easily maintained and extended.

3. **User Experience**:
   - Modal forms for creating/editing to keep users in context
   - Confirmation dialogs for destructive actions (delete)
   - Loading states and error messages for better feedback
   - Color-coded quantity badges (green for in-stock, orange for low-stock, red for out-of-stock)

4. **Data Organization**: Books are automatically grouped by author and sorted by publication year, making it easy to browse the library.

5. **Responsive Design**: Used CSS Grid and Flexbox for a responsive layout that works on all screen sizes.

### Key Features Implementation

- **Quantity Tracking**: Added a quantity field to track available copies of each book, with visual indicators for stock levels
- **Genre Categorization**: Implemented a dropdown with 21 predefined genres for easy book categorization
- **Real-time Updates**: The UI automatically refreshes after create/update/delete operations
- **Form Validation**: Client-side validation ensures data integrity before submission

## 🧪 Testing

To run tests (when implemented):
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Environment Variables

Create a `.env` file in the `backend` directory with:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/nestdb"
PORT=3000
```

## 🚀 Production Build

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ directory with a static file server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


