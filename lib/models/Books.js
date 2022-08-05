const pool = require('../utils/pool');

module.exports = class Books {
  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id,
    this.title = row.title,
    this.released = row.released,
    this.authors = row.authors || [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Books(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    SELECT books.*,
    COALESCE (json_agg(to_jsonb(authors))
    FILTER (WHERE authors.id IS NOT NULL), '[]')
    AS authors 
    FROM books
    LEFT JOIN books_authors ON books_authors.book_id = books.id
    LEFT JOIN authors ON authors.id = books_authors.author_id
    WHERE books.id =$1
    GROUP BY books.id`, [id]);
    if (!rows[0]) return null;
    return new Books(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) RETURNING *', [title, released]);
    return new Books(rows[0]);
  }
};
