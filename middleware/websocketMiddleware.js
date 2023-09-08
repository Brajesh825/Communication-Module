module.exports = function attachWebSocketInstance(io) {
    return function (req, res, next) {
        // Add the io instance to the req object
        req.io = io;

        // Continue with the next middleware or route handler
        next();
    };
};