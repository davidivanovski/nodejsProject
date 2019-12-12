var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/developer', actions.getAllDevelopers);
routes.get('/developer/:id', actions.getSpecificDeveloper);
routes.post('/developer', actions.createDeveloper);
routes.put('/developer/:developerId', actions.updateDeveloper);
routes.delete('/developer/:developerId', actions.deleteDeveloper);

module.exports = routes;