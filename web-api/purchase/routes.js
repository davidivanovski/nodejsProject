var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.post('/purchase/', actions.createPurchase);


module.exports = routes;