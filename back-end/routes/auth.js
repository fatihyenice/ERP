const express = require('express'); 
const bcrypt = require('bcrypt');
const pool = require('../db/db.js');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth');

router.post('/loggin', async (req, res) => { 
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs !" });
    }

    const requete = "SELECT * FROM users WHERE email = ?";
    const donnees = [email];

    pool.query(requete, donnees, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erreur serveur lors de la requête !" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect !" });
        }

        bcrypt.compare(mdp, result[0].password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Erreur serveur lors du traitement du mot de passe" });
            }

            if (isMatch) {
                
                req.session.authed = result[0].Id_users;
                return res.status(200).json({message: "Connexion réussie !", authed: true});
            } else {
                return res.status(401).json({ message: "Email ou mot de passe incorrect !" });
            }
        });
    });
});

router.get('/check-auth', (req, res) => {
    if(req.session.authed){
      return res.status(200).json({authed: true});
    }else{
      return res.status(200).json({authed: false});
    }
})

router.get('/logout', authMiddleWare, (req, res) => {
  req.session.destroy(err => {
    if(err){
        return res.status(500).json({ success: false, message: "Erreur lors de la déconnexion" });
    }
    res.clearCookie('connect.sid'); 

    return res.status(200).json({deconnexion: true})
  });
});

module.exports = router;