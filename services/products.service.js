const { faker } = require('@faker-js/faker');
const products = [];

function createProducts() {
  for (let index = 0; index < 100; index++) {
    products.push({
      id: index + 1,
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
    });
  }
}

function getProducts(req, res) {
  const { size } = req.query;
  const limit = size || 100;
  res.json(products.slice(0, limit));
}

function getProductById(req, res) {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('Not found');
  }
}

function createProduct(req, res) {
  const { name, price, image, description, category } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    image,
    description,
    category,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
}

function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, image, description, category } = req.body;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    res.status(404).send('Not found');
  } else {
    const updatedProduct = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      price: price || products[productIndex].price,
      image: image || products[productIndex].image,
      description: description || products[productIndex].description,
      category: category || products[productIndex].category,
    };
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
  }
}

function deleteProduct(req, res) {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    res.status(404).send('Not found');
  } else {
    products.splice(productIndex, 1);
    res.status(200).json({
      id,
      message: 'Deleted',
    });
  }
}

// crea los productos una sola vez
createProducts();

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
