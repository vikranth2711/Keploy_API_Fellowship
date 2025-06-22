# Bookstore API Server and Frontend

This project consists of a Node.js API server built with Express and MongoDB for managing a bookstore's inventory and a React frontend for a user-friendly interface to interact with the API. This README includes details on the API, tech stack, setup, testing, and test coverage.

## Project Overview

- **Backend**: Node.js with Express, connected to MongoDB for CRUD operations on book data.
- **Frontend**: React single-page application styled with Tailwind CSS, using Axios for API requests.
- **Features**: View, add, edit, and delete books via both API and frontend interface.
- **Testing**: Comprehensive test suite with unit, integration, and API tests using Jest and Supertest.

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

## Tech Stack

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose (ODM)
- **Frontend**:
  - React
  - Tailwind CSS
  - Axios
- **Testing**:
  - Jest (Testing framework)
  - Supertest (API testing)
  - MongoDB Memory Server (In-memory database for integration tests)
  - Istanbul/NYC (Test coverage)

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
│   ├── tests/
│   │   ├── unit/
│   │   │   └── book.test.js    # Unit tests
│   │   ├── integration/
│   │   │   └── book.test.js    # Integration tests
│   │   └── api/
│   │       └── book.test.js    # API tests
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
├── coverage/               # Test coverage reports
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
   git clone https://github.com/your-username/bookstore-api.git
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

### Running Tests

1. In the `backend` directory, run:
   ```bash
   npm test
   ```
   This will execute unit, integration, and API tests.
2. To generate test coverage:
   ```bash
   npm run test:coverage
   ```
   Coverage reports are saved in the `coverage/` directory.

## Testing Details

### Testing Frameworks/Tools

- **Jest**: Primary testing framework for unit, integration, and API tests.
- **Supertest**: For testing API endpoints by sending HTTP requests.
- **MongoDB Memory Server**: In-memory MongoDB instance for integration tests.
- **Istanbul/NYC**: For generating test coverage reports.

### Test Coverage

The test suite achieves **85% code coverage** across unit, integration, and API tests. Below is a screenshot of the coverage report:

![Test Coverage Screenshot](coverage/coverage-screenshot.png)

_Note_: To generate the coverage screenshot, run `npm run test:coverage` and capture the output from the `coverage/lcov-report/index.html` file.

### Test Structure

- **Unit Tests** (`tests/unit/book.test.js`):
  - Test Mongoose model logic (e.g., schema validation).
  - Use both mocked and non-mocked approaches for database interactions.
  - Cover edge cases like invalid data inputs.
- **Integration Tests** (`tests/integration/book.test.js`):
  - Test CRUD operations with an in-memory MongoDB instance.
  - Verify database interactions and error handling.
- **API Tests** (`tests/api/book.test.js`):
  - Test all API endpoints (`GET`, `POST`, `PUT`, `DELETE`).
  - Verify status codes, response bodies, and error cases (e.g., 404 for non-existent books).

### Example Test Commands

- Run all tests:
  ```bash
  npm test
  ```
- Run unit tests only:
  ```bash
  npx jest tests/unit
  ```
- Run integration tests only:
  ```bash
  npx jest tests/integration
  ```
- Run API tests only:
  ```bash
  npx jest tests/api
  ```

## Testing APIs Directly

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

- Ensure MongoDB is running before starting the server for non-test environments.
- The backend includes error handling for invalid requests and non-existent resources.
- CORS is enabled to allow frontend requests from `http://localhost:3001` or `http://localhost:8080`.
- Tests use an in-memory MongoDB instance to avoid affecting the production database.
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

## GitHub Repository

The complete codebase, including tests, is available at:
[https://github.com/your-username/bookstore-api](https://github.com/your-username/bookstore-api)

_Note_: Replace `your-username` with your actual GitHub username.
