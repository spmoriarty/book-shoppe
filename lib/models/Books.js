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
};
