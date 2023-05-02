const express = require('express');
const productsRouter = require('./products.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api', router)
  router.use('/products', productsRouter);
  router.use('/products/:id', productsRouter);
}

module.exports = routerApi;
