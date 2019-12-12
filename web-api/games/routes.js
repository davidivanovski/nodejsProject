var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/games', actions.getAllGames);
routes.get('/games/:gameId', actions.getSpecificGame);
routes.post('/games', actions.createGame);
routes.put('/games/:gameId', actions.updateGame)
routes.delete('/games/:gameId', actions.deleteGame)

module.exports = routes;