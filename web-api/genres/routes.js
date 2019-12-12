var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/genres', actions.getAllGenres);
routes.get('/genres/:id', actions.getSpecificGenre);
routes.post('/genres', actions.createGenre);
routes.put('/generes/:genreId', actions.updateGenre)
routes.delete('/genres/:genreId', actions.deleteGenre)

module.exports = routes;