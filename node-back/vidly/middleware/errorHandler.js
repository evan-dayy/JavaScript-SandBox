module.exports = function(err, req, res, next) {
    res.status(500).send('Status 500: Internal Server Error.');
    next();
}