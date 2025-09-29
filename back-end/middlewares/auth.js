function authMiddleWare(req, res, next){
    if(req.session.authed){
        return next();
    }
    return res.status(401).json({message: "Vous n'êtes pas autorisé !"});
}


module.exports = authMiddleWare;