const pool = require('../utils/pool');

module.exports = class Books {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id,
    this.title = row.title,
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Books(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Books(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) RETURNING *', [title, released]);
    return new Books(rows[0]);
  }
};
