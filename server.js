const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

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
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});