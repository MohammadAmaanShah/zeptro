const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    price REAL,
    discountPercentage REAL,
    rating REAL,
    stock INTEGER,
    brand TEXT,
    category TEXT,
    thumbnail TEXT,
    images TEXT,
    tags TEXT
  )`);
});

module.exports = db;
