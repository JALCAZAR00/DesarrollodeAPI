// Importa la librería Faker para generar datos de prueba.
const { faker } = require('@faker-js/faker');

// Los productos se almacenan en un arreglo de objetos.
const products = [];

//Crear objetos de productos con datos aleatorios, que se agregan al arreglo products.
async function createProducts() {
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

//Obtener una lista de productos.
async function getProducts(req, res) {
  const { size } = req.query;
  const limit = size || 100;
  res.json(products.slice(0, limit));
}

//Obtener un producto por su ID.
async function getProductById(req, res) {
  const { id } = req.params;
  const product = await products.find(p => p.id === parseInt(id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('Not found');
  }
}

//Crear un nuevo producto.
async function createProduct(req, res) {
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

//Actualizar un producto existente.
async function updateProduct(req, res) {
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

//Elimina un producto existente.
async function deleteProduct(req, res) {
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

//Crea los productos una sola vez.
createProducts();

//Exportar las funciones
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
