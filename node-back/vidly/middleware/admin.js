
// the middleware should run after the auth
module.exports = function(req, res, next) {
    if (!req.user.isAdmin) {
        // 401: Unauthorized => no JWT => you can try again
        // 403: forbidden, do not try again
        return res.status(403).send("Forbidden, Access denied ....")
    }
    next();
}