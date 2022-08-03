const { Router } = require('express');
const Books = require('../models/Books');

module.exports = Router()
  .get('/', async (req, res) => {
    const books =  await Books.getAll();
    res.json(books);
  })
;
