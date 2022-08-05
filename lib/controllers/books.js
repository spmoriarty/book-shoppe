const { Router } = require('express');
const Books = require('../models/Books');

module.exports = Router()
  .get('/', async (req, res) => {
    const books =  await Books.getAll();
    res.json(books);
  })

  .get('/:id', async (req, res) => {
    const matchingBook = await Books.getById(req.params.id);
    console.log(matchingBook);
    res.json(matchingBook);
  })

  .post('/', async (req, res) => {
    const data = await Books.insert(req.body);
    res.json(data);
  })
;
