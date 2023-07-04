/**
 * the middleware function is only triggered when there is an error 
 * in the request processing pipeline;
 */
const winston = require('winston');
module.exports = function(err, req, res, next) {
    res.status(500).send('Status 500: Internal Server Error.');
    winston.error(err.message, err);  // log it to the files
    next();
}