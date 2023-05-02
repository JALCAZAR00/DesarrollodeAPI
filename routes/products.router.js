const express = require('express');
const router = express.Router();
const productsController = require('../services/products.service');

//Validar datos con Joi
const validatorHandler = require('../middlewares/validator.handler.js')
const { createProductSchema, updateProductSchema } = require('../schemas/product.schema.js')

// Maneja la solicitud GET '/'
router.get('/', productsController.getProducts);

// Maneja la solicitud GET '/:id'
router.get('/:id', productsController.getProductById);

// Maneja la solicitud POST '/'
router.post('/', validatorHandler(createProductSchema, 'params'), productsController.createProduct);

// Maneja la solicitud PATCH '/:id'
router.patch('/:id', validatorHandler(updateProductSchema, 'params'), productsController.updateProduct);

// Maneja la solicitud DELETE '/:id'
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
