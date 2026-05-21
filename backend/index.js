require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper to parse JSON fields
const parseProduct = (product) => {
  if (!product) return null;
  return {
    ...product,
    images: JSON.parse(product.images || '[]'),
    tags: JSON.parse(product.tags || '[]')
  };
};

app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ products: rows.map(parseProduct) });
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(parseProduct(row));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
