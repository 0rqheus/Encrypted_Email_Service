module.exports = {

    checkAuth : function(req, res, next) {
        req.user ? next() : res.sendStatus(401);
    },

    checkAdmin: function(req, res, next) {
        req.user
        ? req.user.role === 1
            ? next()
            : res.sendStatus(403) 
        :res.sendStatus(401);
    }
};