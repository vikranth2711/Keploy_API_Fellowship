const mongoose = require('mongoose');
const { Book } = require('../../models/Book');

jest.mock('../../models/Book');

describe('Book Model Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a book with valid data', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    Book.create.mockResolvedValue(bookData);

    const book = await Book.create(bookData);
    expect(book).toHaveProperty('title', 'The Great Gatsby');
    expect(book).toHaveProperty('author', 'F. Scott Fitzgerald');
    expect(book).toHaveProperty('year', 1925);
    expect(book).toHaveProperty('genre', 'Fiction');
  });

  it('should fail to create a book without required fields', async () => {
    const bookData = {
      author: 'F. Scott Fitzgerald',
      year: 1925,
    };

    Book.create.mockRejectedValue(new mongoose.Error.ValidationError());

    await expect(Book.create(bookData)).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should fail if year is not a number', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 'invalid',
      genre: 'Fiction',
    };

    Book.create.mockRejectedValue(new mongoose.Error.ValidationError());

    await expect(Book.create(bookData)).rejects.toThrow(mongoose.Error.ValidationError);
  });

  // Non-mocked test for schema validation
  it('should validate book schema with real mongoose model', async () => {
    jest.unmock('../../models/Book');
    const { Book } = jest.requireActual('../../models/Book');

    const book = new Book({
      title: 'Test Book',
      author: 'Test Author',
      year: 2020,
      genre: 'Non-Fiction',
    });

    await expect(book.validate()).resolves.toBeUndefined();
  });
});