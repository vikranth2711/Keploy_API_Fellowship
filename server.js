const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load the OpenAPI specification
const openApiPath = path.join(__dirname, 'openapi.yaml');
const openApiSpec = yaml.load(fs.readFileSync(openApiPath, 'utf8'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// MongoDB connection - only connect if not in test environment
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
}

// Import Book model instead of defining it inline
const { Book } = require('./models/Book');

// API Endpoints

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, year, genre } = req.body;
    if (!title || !author || !year || !genre) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const book = new Book({ title, author, year, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update book
app.put('/api/books/:id', async (req, res) => {
  try {
    const { title, author, year, genre } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year, genre },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
if (require.main === module) {
  // Only start the server if this file is run directly (not required by tests)
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// Export for testing
module.exports = app;