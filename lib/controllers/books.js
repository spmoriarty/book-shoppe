const { Router } = require('express');
const Books = require('../models/Books');

module.exports = Router()
  .get('/', async (req, res) => {
    const books =  await Books.getAll();
    res.json(books);
  })

  .get('/:id', async (req, res) => {
    const matchingBook = await Books.getById(req.params.id);
    res.json(matchingBook);
  })
;
