const express = require('express');
const pool = require('../db/db');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth')

router.get('/getAllClient', authMiddleWare, (req, res) => {
    const requete = "SELECT * FROM autoriser aut INNER JOIN themes the ON aut.Id_themes = the.Id_themes WHERE aut.Id_users = ? AND aut.Id_themes = ?"
    const donnees = [req.session.authed, 1];

    pool.query(requete, donnees, (err, result) => {
        if(err){
          return res.status(501).json({message: "Impossible d'exécuter la requête !"})
        }

        if(result == 0){
          return res.status(200).json({unhautorized: "Vous n'avez pas les autorisations pour cette card !"});
        }

        const requeteDeux = "SELECT * FROM clients WHERE Id_users = ?";

        pool.query(requeteDeux, req.session.authed, (errClient, resultClient) => {
          if(errClient){
          return res.status(501).json({message: "Impossible d'exécuter la requête !"})
          }

          return res.status(200).json(resultClient);
        })
    })
})

router.post('/detail', authMiddleWare, (req, res) => {
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


module.exports = router;