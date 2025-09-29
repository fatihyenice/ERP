const express = require('express')
const session = require("express-session") 
const cors = require('cors');
const bcrypt = require('bcrypt');
const authMiddleWare = require('./middlewares/auth'); 
const app = express();
const pool = require("./db/db.js");
require("dotenv").config(); 

const port = process.env.PORT

app.use(cors({
  origin: process.env.URL_FRONT,
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // clé secrète
    resave: false, // ne pas sauvegarder si pas modifié
    saveUninitialized: false, // ne pas créer de session vide
    cookie: {
      httpOnly: true,
      secure: false, // mettre true si HTTPS
      maxAge: 1000 * 60 * 60 * 2, // 2 heures
    },
  })
);  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getThemes', async (req, res) => { 
  const getAllThemeSql = "SELECT * FROM themes"

  pool.query(getAllThemeSql, (err, result) => {
    if(err){
        return res.status(400).json("Impossible de récuperer les thèmes");
    }

    return res.status(200).json(result);
  })
});

app.post('/loggin', async (req, res) => { 
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

app.get('/check-auth', (req, res) => {
    if(req.session.authed){
      return res.status(200).json({authed: true});
    }else{
      return res.status(200).json({authed: false});
    }
})

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`)
})
