var express = require('express');
var userRouter = require('./users/routes');
var postRouter = require('./developer/routes');
var publisherRouter = require('./publisher/routes');
var genreRouter = require('./genres/routes');
var gameRouter = require('./games/routes');
var purchaseRouter = require('./purchase/routes')


const appRouter = express.Router();

appRouter.use(userRouter);
appRouter.use(postRouter);
appRouter.use(publisherRouter);
appRouter.use(genreRouter);
appRouter.use(gameRouter);
appRouter.use(purchaseRouter);


module.exports = appRouter;