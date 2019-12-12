var express = require('express');
var bodyParser = require('body-parser');
const appRouter = require('./router');
const middleware = require('./middlewares/common')
require('dotenv/config');
var jwt = require('express-jwt');
var unless = require('express-unless');

const app = express();

app.use(middleware.logger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: '*/*' }));


// const publicRoutePaths = ['/api/users/login', '/api/users/create'];
// app.use(jwt({ secret: 'aaaa' }).unless({path: publicRoutePaths}));

app.use('/api', appRouter);

app.use(middleware.wrongRoute);
app.use(middleware.errorHandler);

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});