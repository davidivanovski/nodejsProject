logger = (req, res, next) => {
    console.log(`Logged ${req.url} - ${req.method} --- ${new Date()}`);
    next();
};

wrongRoute = (req, res, next) => {
    var error = new Error("Non existant route. Try another route.");
    error.status = 404;
    next(error);
};

errorHandler = (err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    };

    res.status(err.status).json(errorObj);
}; 

module.exports = {
    logger,
    wrongRoute,
    errorHandler
}