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
  afterAll(() => {
    pool.end();
  });
});



// describe('books route', () => {
//   beforeEach(() => {
//     return setup(pool);
//   });
//   it('example test - delete me!', () => {
//     expect(1).toEqual(1);
//   });
//   afterAll(() => {
//     pool.end();
//   });
// });
