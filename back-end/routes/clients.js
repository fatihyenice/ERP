const express = require('express');
const pool = require('../db/db');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth')
const authCard = require('../middlewares/autorizationCard')

router.get('/getAllClient', authMiddleWare, authCard(1), (req, res) => {
    const requete = "SELECT * FROM autoriser aut INNER JOIN themes the ON aut.Id_themes = the.Id_themes WHERE aut.Id_users = ? AND aut.Id_themes = ?"
    const donnees = [req.session.authed, 1];

    pool.query(requete, donnees, (err, result) => {
        if(err){
          return res.status(501).json({message: "Impossible d'exécuter la requête !"})
        }

        if(result == 0){
          return res.status(200).json({unhautorized: "Vous n'avez pas les autorisations pour cette card !"});
        }

        const requeteDeux = "SELECT * FROM clients WHERE Id_users = ? ORDER BY id DESC";

        pool.query(requeteDeux, req.session.authed, (errClient, resultClient) => {
          if(errClient){
          return res.status(501).json({message: "Impossible d'exécuter la requête !"})
          }

          return res.status(200).json(resultClient);
        })
    })
})

router.post('/detail', authMiddleWare, authCard(1), (req, res) => {
    const { idClient } = req.body;

    if(!/^\d+$/.test(idClient)){
      return res.status(400).json({message: "Id client invalide !"})
    }
    
    const existeReq = "SELECT * FROM clients WHERE id = ? AND Id_users = ?";
    const donnees = [idClient, req.session.authed];

    pool.query(existeReq, donnees, (err, result) => {
        if(err){
          return res.status(501).json({message: "Impossible d'exécuter la requête !"});
        }

        if(result.length === 0){
          return res.status(404).json({introuvable: "Le client est introuvable !"});
        } 

          return res.status(200).json(result[0]); 
    })
})
router.post('/addClient', authMiddleWare, authCard(1), (req, res) => {
    const { nomr, prenomr, emailr, telephoner, naissancer, adresser, codepostalr, paysr } = req.body;
 
    if(!nomr || !prenomr || !emailr || !telephoner || !naissancer || !adresser || !codepostalr || !paysr){
        return res.status(401).json({ message: "Veuillez remplir tous les champs !" });
    }
 
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
    if(!nameRegex.test(nomr)) return res.status(401).json({ message: "Nom invalide !" });
    if(!nameRegex.test(prenomr)) return res.status(401).json({ message: "Prénom invalide !" });
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailr)) return res.status(401).json({ message: "Email invalide !" });
 
    const phoneRegex = /^[0-9+()\-\s]{6,20}$/;
    if(!phoneRegex.test(telephoner)) return res.status(401).json({ message: "Téléphone invalide !" });
 
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!birthRegex.test(naissancer)) return res.status(401).json({ message: "Date de naissance invalide !" });
 
    const addressRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s,'-]{3,}$/;
    if(!addressRegex.test(adresser)) return res.status(401).json({ message: "La rue (adresse) est invalide !" });
 
    const postalRegex = /^\d{5}$/;
    if(!postalRegex.test(codepostalr)) return res.status(401).json({ message: "Code postal invalide !" });
 
    const countryRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    if(!countryRegex.test(paysr)) return res.status(401).json({ message: "Pays invalide !" });
  
    const checkReq = "SELECT * FROM clients WHERE prenom = ? OR email = ?";
    pool.query(checkReq, [prenomr, emailr], (err, rows) => {
        if(err){
            console.error(err);
            return res.status(501).json({ message: "Erreur lors de la vérification d'unicité !" });
        }

        if(rows.length > 0){ 
            if(rows.some(r => r.email === emailr)){
                return res.status(409).json({ message: "Cet email existe déjà !" });
            }
            if(rows.some(r => r.prenom === prenomr)){
                return res.status(409).json({ message: "Ce prénom existe déjà !" });
            }
        }
 
        const insertionReq = "INSERT INTO clients(nom,prenom,email,tel,datenaissance,rue,codepostal,pays,Id_users) VALUES (?,?,?,?,?,?,?,?,?)";
        const donneesInsert = [nomr, prenomr, emailr, telephoner, naissancer, adresser, codepostalr, paysr, req.session.authed];
    
        pool.query(insertionReq, donneesInsert, (err, result) => {
            if(err){
              console.error(err);
              return res.status(501).json({message: "Impossible d'insérer la requête !"});
            }
    
            return res.status(200).json({insert: "Le client a bien été créé !"});
        });
    });
});

router.post('/accessPageRenduFront', (req, res) => {
   const themeId = req.body.themeId;  
   const reqVerif = `
     SELECT * FROM autoriser 
     WHERE Id_themes = ? AND Id_users = ?
   `;
   const params = [themeId, req.session.authed];

   pool.query(reqVerif, params, (err, resultat) => {
      if(err){ 
        return res.status(500).json({message: "Erreur lors de la requête !"});
      }

      if(resultat.length === 0){
        return res.status(403).json({message: "Accès refusé"});
      }

      return res.status(200).json({message: "Accès autorisé"});
   })
})


module.exports = router;