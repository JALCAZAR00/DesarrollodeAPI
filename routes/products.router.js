const express = require('express');
const router = express.Router();
const productsController = require('../services/products.service');

// Maneja la solicitud GET '/'
router.get('/', productsController.getProducts);

// Maneja la solicitud GET '/:id'
router.get('/:id', productsController.getProductById);

// Maneja la solicitud POST '/'
router.post('/', productsController.createProduct);

// Maneja la solicitud PATCH '/:id'
router.patch('/:id', productsController.updateProduct);

// Maneja la solicitud DELETE '/:id'
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
