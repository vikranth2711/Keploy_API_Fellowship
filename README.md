# Bookstore API Server and Frontend

This project consists of a Node.js API server built with Express and MongoDB for managing a bookstore's inventory and a React frontend for a user-friendly interface to interact with the API.

## Project Overview

- **Backend**: Node.js with Express, connected to MongoDB for CRUD operations on book data.
- **Frontend**: React single-page application styled with Tailwind CSS, using Axios for API requests.
- **Features**: View, add, edit, and delete books via both API and frontend interface.

## API Endpoints

### `GET /api/books`

- **Description**: Retrieves all books.
- **Response**: Array of book objects.
- **Sample Response**:
  ```json
  [
    { "_id": "123", "title": "Book Title", "author": "Author Name", "year": 2020, "genre": "Fiction" },
    ...
  ]
  ```

### `GET /api/books/:id`

- **Description**: Retrieves a single book by ID.
- **Response**: Book object or 404 if not found.
- **Sample Response**:
  ```json
  {
    "_id": "123",
    "title": "Book Title",
    "author": "Author Name",
    "year": 2020,
    "genre": "Fiction"
  }
  ```

### `POST /api/books`

- **Description**: Creates a new book.
- **Request Body**:
  ```json
  { "title": "string", "author": "string", "year": number, "genre": "string" }
  ```
- **Response**: Created book object.
- **Sample Response**:
  ```json
  {
    "_id": "123",
    "title": "Book Title",
    "author": "Author Name",
    "year": 2020,
    "genre": "Fiction"
  }
  ```

### `PUT /api/books/:id`

- **Description**: Updates a book by ID.
- **Request Body**:
  ```json
  { "title": "string", "author": "string", "year": number, "genre": "string" }
  ```
- **Response**: Updated book object or 404 if not found.
- **Sample Response**:
  ```json
  {
    "_id": "123",
    "title": "Updated Title",
    "author": "Author Name",
    "year": 2021,
    "genre": "Fiction"
  }
  ```

### `DELETE /api/books/:id`

- **Description**: Deletes a book by ID.
- **Response**: Success message or 404 if not found.
- **Sample Response**:
  ```json
  { "message": "Book deleted successfully" }
  ```

## Database

- **Technology**: MongoDB
- **Schema**: Books collection with fields:
  - `title`: String (required)
  - `author`: String (required)
  - `year`: Number (required)
  - `genre`: String (required)
- **Integration**: Uses Mongoose ODM for schema definition and database operations.

## Frontend

- **Framework**: React (single-page application)
- **Styling**: Tailwind CSS
- **API Client**: Axios for making HTTP requests
- **Features**:
  - Display a list of books
  - Form to add new books
  - Edit existing books
  - Delete books
  - Responsive and user-friendly interface

## Project Structure

```
bookstore-api/
├── backend/
│   ├── models/
│   │   └── Book.js         # Mongoose schema for books
│   ├── routes/
│   │   └── books.js        # API routes
│   ├── server.js           # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js          # Main React component
│   │   └── index.js        # React entry point
│   ├── public/
│   │   └── index.html      # HTML template
│   └── package.json
├── .env                    # Environment variables
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017 or provide a MongoDB URI)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bookstore-api
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookstore
```

### Run the Backend

1. Start MongoDB (ensure it's running).
2. In the `backend` directory, run:
   ```bash
   npm start
   ```
   The server will be available at `http://localhost:3000`.

### Run the Frontend

1. In the `frontend` directory, run:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3001` (or the port specified by your React setup).
2. Alternatively, serve the `frontend/public/index.html` using a simple HTTP server:
   ```bash
   npx http-server frontend/public -p 8080
   ```
   Access it at `http://localhost:8080`.

### Testing APIs

Use tools like Postman or curl to test the APIs. Examples:

- Get all books:

  ```bash
  curl http://localhost:3000/api/books
  ```

- Create a book:

  ```bash
  curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","year":1925,"genre":"Fiction"}'
  ```

- Update a book:

  ```bash
  curl -X PUT http://localhost:3000/api/books/<book-id> -H "Content-Type: application/json" -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","year":1926,"genre":"Fiction"}'
  ```

- Delete a book:
  ```bash
  curl -X DELETE http://localhost:3000/api/books/<book-id>
  ```

## Notes

- Ensure MongoDB is running before starting the server.
- The backend includes error handling for invalid requests and non-existent resources.
- CORS is enabled to allow frontend requests from `http://localhost:3001` or `http://localhost:8080`.
- For production:
  - Use a proper build process for the React app (e.g., `npm run build` with Vite or Create React App).
  - Host the backend on a platform like Heroku or Render.
  - Use a cloud MongoDB service like MongoDB Atlas.
- The frontend assumes the backend is running at `http://localhost:3000`. Update the API base URL in the frontend code if deploying to different hosts.

## Deployment Considerations

- **Backend**: Use environment variables for sensitive data (e.g., MongoDB URI).
- **Frontend**: Build the React app and serve it with a static file server (e.g., Nginx).
- **Database**: Use MongoDB Atlas for a managed database in production.
- **CORS**: Update CORS settings in the backend to allow requests only from the production frontend domain.
