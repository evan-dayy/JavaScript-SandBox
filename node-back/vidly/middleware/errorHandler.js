const winston = require('winston');
module.exports = function(err, req, res, next) {
    res.status(500).send('Status 500: Internal Server Error.');
    winston.error(err.message, err);  // log it to the files
    next();
}