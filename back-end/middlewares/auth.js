function authMiddleWare(req, res, next){
    if(req.session.authed){
        return next();
    }
    return res.status(400).json({message: "Vous n'êtes pas à accéder à cette page !"});
}
 
module.exports = authMiddleWare;