const Joi = require('joi');

const name = Joi.string(). alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price
});

module.exports = { createProductSchema, updateProductSchema };
