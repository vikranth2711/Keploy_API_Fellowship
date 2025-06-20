Bookstore API Server and Frontend
This project includes a Node.js API server built with Express and MongoDB for managing books, and a React frontend for interacting with the API.
APIs Created

GET /api/books

Retrieves all books
Response: Array of book objects
Sample Response: [{ "_id": "123", "title": "Book Title", "author": "Author Name", "year": 2020, "genre": "Fiction" }, ...]

GET /api/books/:id

Retrieves a single book by ID
Response: Book object or 404 if not found
Sample Response: { "\_id": "123", "title": "Book Title", "author": "Author Name", "year": 2020, "genre": "Fiction" }

POST /api/books

Creates a new book
Request Body: { "title": "string", "author": "string", "year": number, "genre": "string" }
Response: Created book object
Sample Response: { "\_id": "123", "title": "Book Title", "author": "Author Name", "year": 2020, "genre": "Fiction" }

PUT /api/books/:id

Updates a book by ID
Request Body: { "title": "string", "author": "string", "year": number, "genre": "string" }
Response: Updated book object or 404 if not found
Sample Response: { "\_id": "123", "title": "Updated Title", "author": "Author Name", "year": 2021, "genre": "Fiction" }

DELETE /api/books/:id

Deletes a book by ID
Response: Success message or 404 if not found
Sample Response: { "message": "Book deleted successfully" }

Database

MongoDB: Stores book data with fields for title, author, year, and genre.
Integration: Uses Mongoose ODM for schema definition and database operations.

Frontend

React: A single-page application using React for UI, Tailwind CSS for styling, and Axios for API requests.
Features: List books, add new books, edit existing books, and delete books via a user-friendly interface.

Setup Instructions

Prerequisites:

Node.js (v14 or higher)
MongoDB (running locally on default port 27017)

Installation:
git clone <repository-url>
cd bookstore-api
npm install

Run the Server:
npm start

The server will run on http://localhost:3000.

Run the Frontend:

Place index.html in a directory (e.g., frontend).
Serve index.html using a simple HTTP server (e.g., Live Server in VS Code, or npx http-server).
Open the browser to the served URL (e.g., http://localhost:8080).

Testing APIs
Use curl or tools like Postman to test the APIs. Examples:

Get all books:
curl http://localhost:3000/api/books

Create a book:
curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","year":1925,"genre":"Fiction"}'

Update a book:
curl -X PUT http://localhost:3000/api/books/<book-id> -H "Content-Type: application/json" -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","year":1926,"genre":"Fiction"}'

Delete a book:
curl -X DELETE http://localhost:3000/api/books/<book-id>

Notes

Ensure MongoDB is running before starting the server.
The server includes error handling for invalid requests and non-existent resources.
CORS is enabled to allow the frontend to make requests to the server.
The frontend requires the server to be running at http://localhost:3000.
For production, consider using a proper build process for the React app (e.g., Vite or Create React App).
