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
    });
  });
  it('/books/:id should return an individual book', async () => {
    const res = await request(app).get('/books/4');
    const book = {
      id: '4',
      title: 'Amerika',
      released: 1927
    };
    expect(res.body).toEqual(book);
  });
  it('POST should insert into books table', async () => {
    const newBook = {
      title: 'Animal Farm',
      released: 1947
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



