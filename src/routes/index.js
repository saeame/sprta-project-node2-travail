class CustomError extends Error {
  code = 0;
  message = '';
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}
const express = require('express');
const router = express.Router();

const productRouter = require('./product.routes.js');

router.use('/product', productRouter);

module.exports = router;

module.exports = { CustomError };
