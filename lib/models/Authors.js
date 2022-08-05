const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id,
    this.name = row.name,
    this.dob = row.dob,
    this.pob = row.pob,
    this.books = row.books || [];
  }

  static async getAll() {
    const { rows } = await pool.query(' SELECT * FROM authors');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT authors.*,
      COALESCE (json_agg(to_jsonb(books))
      FILTER (WHERE books.id IS NOT NULL), '[]')
      AS books 
      FROM authors
      LEFT JOIN books_authors ON books_authors.author_id = authors.id 
      LEFT JOIN books ON books.id = books_authors.book_id
      WHERE authors.id =$1
      GROUP BY authors.id`, [id]);
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) RETURNING *', [name, dob, pob]);
    return new Author(rows[0]);
  }
};
