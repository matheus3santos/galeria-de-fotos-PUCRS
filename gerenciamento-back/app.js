const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/product');

const app = express();
app.use(bodyParser.json());

// Rotas
app.use('/products', productsRoutes);

module.exports = app;
