//MIDDLEWARE FOR CHECKING IF AUTHENTICATED USER IS ADMIN
module.exports = function (req, res, next) {
    if(req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({message:'Admin access Required'});
}
