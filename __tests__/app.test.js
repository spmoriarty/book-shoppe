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
    },
    {
      id: 2,
      name: 'Eric Arthur Blair',
      dob: 1903,
      pob: 'Motihari, British India',
    }
    ];
    console.log(res.body); 
    expect(res.body[2]).toEqual({
      id: '3',
      name: 'F. Scott Fitzgerald',
      dob: 1896,
      pob: 'Saint Paul, Minnesota',
    });
  });
  it('/authors/:id should return an individual author detail', async () => {
    const res = await request(app).get('/authors/4');
    const author = {
      id: '4',
      name: 'Franz Kafka',
      dob: 1883,
      pob: 'Prague, Kingdom of Bohemia'
    };
    expect(res.body).toEqual(author);
  });
  
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
      console.log(res.body);
      expect(res.body[2]).toEqual({
        id: '3',
        title: 'The Great Gatsby',
        released: 1925,
      });
    });
  });
  afterAll(() => {
    pool.end();
  });
});



