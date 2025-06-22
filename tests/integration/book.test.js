const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Book } = require('../../models/Book');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Book Model Integration Tests', () => {
  beforeEach(async () => {
    await Book.deleteMany({});
  });

  it('should create and retrieve a book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    const createdBook = await Book.create(bookData);
    const foundBook = await Book.findById(createdBook._id);

    expect(foundBook).toHaveProperty('title', 'The Great Gatsby');
    expect(foundBook).toHaveProperty('author', 'F. Scott Fitzgerald');
    expect(foundBook).toHaveProperty('year', 1925);
    expect(foundBook).toHaveProperty('genre', 'Fiction');
  });

  it('should update a book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    const createdBook = await Book.create(bookData);
    await Book.findByIdAndUpdate(createdBook._id, { year: 1926 });

    const updatedBook = await Book.findById(createdBook._id);
    expect(updatedBook.year).toBe(1926);
  });

  it('should delete a book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    const createdBook = await Book.create(bookData);
    await Book.findByIdAndDelete(createdBook._id);

    const foundBook = await Book.findById(createdBook._id);
    expect(foundBook).toBeNull();
  });
});