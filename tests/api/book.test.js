const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import app but prevent it from connecting to the real database
process.env.NODE_ENV = 'test'; // Set test environment
const app = require('../../server');

let mongoServer;

beforeAll(async () => {
  // Disconnect from any existing connection first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Book API Tests', () => {
  beforeEach(async () => {
    await mongoose.connection.collection('books').deleteMany({});
  });

  it('GET /api/books should return all books', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    await mongoose.connection.collection('books').insertOne(bookData);

    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('title', 'The Great Gatsby');
  });

  it('GET /api/books/:id should return a book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    const insertedBook = await mongoose.connection.collection('books').insertOne(bookData);
    const bookId = insertedBook.insertedId.toString();

    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'The Great Gatsby');
  });

  it('GET /api/books/:id should return 404 for non-existent book', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/books/${nonExistentId}`);
    expect(res.status).toBe(404);
  });

  it('POST /api/books should create a book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    const res = await request(app)
      .post('/api/books')
      .send(bookData)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'The Great Gatsby');
  });

  it('PUT /api/books/:id should update a book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    const insertedBook = await mongoose.connection.collection('books').insertOne(bookData);
    const bookId = insertedBook.insertedId.toString();

    const updateData = { title: 'Updated Title', author: 'F. Scott Fitzgerald', year: 1926, genre: 'Fiction' };

    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .send(updateData)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Title');
  });

  it('DELETE /api/books/:id should delete a book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction',
    };

    const insertedBook = await mongoose.connection.collection('books').insertOne(bookData);
    const bookId = insertedBook.insertedId.toString();

    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Book deleted successfully');
  });
});