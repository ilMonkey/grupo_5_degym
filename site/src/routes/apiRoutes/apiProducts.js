// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsResource = require('../apiRoutes/apiProducts.js');




router.get('/products', productsResource.all)