var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/publishers', actions.getAllPublisher);
routes.get('/publishers/:publisherId', actions.getSpecificPublisher);
routes.post('/publishers', actions.createPublisher);
routes.put('/publishers/:publisherId', actions.updatePublisher)
routes.delete('/publishers/:publisherId', actions.deletePublisher)

module.exports = routes;