const axios = require('axios');
const db = require('./db');

async function seed() {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=100');
    const products = response.data.products;

    db.serialize(() => {
      const stmt = db.prepare(`INSERT INTO products (
        id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

      products.forEach((product) => {
        stmt.run(
          product.id,
          product.title,
          product.description,
          product.price,
          product.discountPercentage,
          product.rating,
          product.stock,
          product.brand,
          product.category,
          product.thumbnail,
          JSON.stringify(product.images),
          JSON.stringify(product.tags)
        );
      });

      stmt.finalize();
      console.log('Seeding completed!');
    });
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed();
