const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

describe('books route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get all books route!', async () => {
    const res = await request(app).get('/books');
    // eslint-disable-next-line
    const expected = [{
      id: 1,
      title: 'Brave New World',
      released: 1932,
    },
    {
      id: 2,
      title: '1984',
      released: 1949,
    }
    ];

    expect(res.body[2]).toEqual({
      id: '3',
      title: 'The Great Gatsby',
      released: 1925,
      authors: expect.any(Array)
    });
  });
  it('/books/:id should return an individual book with authors', async () => {
    const res = await request(app).get('/books/4');
    
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
      authors: expect.any(Array)
      
  
    });
  });
  it('POST should insert into books table', async () => {
    const newBook = {
      title: 'Animal Farm',
      released: 1947,
      authors: expect.any(Array)
    };
    const resp = await request(app).post('/books').send(newBook);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newBook,
    });
  });
  afterAll(() => {
    pool.end();
  });
});



