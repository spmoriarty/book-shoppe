const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

describe('authors route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    const expected = [{
      id: 1,
      name: 'Aldous Huxley',
      dob: 1894,
      pob: 'Surrey, England',
      books: expect.any(Array)
    },
    {
      id: 2,
      name: 'Eric Arthur Blair',
      dob: 1903,
      pob: 'Motihari, British India',
      books: expect.any(Array)
    }
    ];
    
    expect(res.body[2]).toEqual({
      id: '3',
      name: 'F. Scott Fitzgerald',
      dob: 1896,
      pob: 'Saint Paul, Minnesota',
      books: expect.any(Array)
    });
  });
  it('/authors/:id should return an individual author detail, with book info', async () => {
    const res = await request(app).get('/authors/4');
 
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      pob: expect.any(String),
      dob: expect.any(Number),
      books: expect.any(Array)
    });
  });
  it('POST should insert into authors table', async () => {
    const newAuthor = {
      name: 'J.R.R. Tolkien',
      dob: 1883,
      pob: 'Bloemfontein, South Africa',
    };
    const resp = await request(app).post('/authors').send(newAuthor);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newAuthor,
      books: expect.any(Array)
    });
  });
  afterAll(() => {
    pool.end();
  });
});
