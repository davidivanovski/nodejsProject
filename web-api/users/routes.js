var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/users', actions.getAllUsers);
routes.get('/users/:userId', actions.getSpecificUser);
routes.post('/users/create', actions.createUser);
routes.put('/users/:userId', actions.updateUser);
routes.post('/users/login', actions.loginUser)
routes.delete('/users/:userId', actions.deleteUser)



module.exports = routes;