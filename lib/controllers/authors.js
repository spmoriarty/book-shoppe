const { Router } = require('express');
const Authors = require('../models/Author');

module.exports = Router()
.get('/', async (req, res) => {
    const authors = await Authors.getAll();
    res.json(authors);
})

.get('/:id', async (req, res) => {
    const matchingAuthor = await Authors.getById(req.params.id);
    res.json(matchingAuthor);
});