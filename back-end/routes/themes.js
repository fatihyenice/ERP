const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const authMiddleWare = require('../middlewares/auth');

router.get('/getThemes', authMiddleWare, (req, res) => {  
  const sql = "SELECT * FROM autoriser aut INNER JOIN themes the ON aut.Id_themes = the.Id_themes WHERE aut.Id_users = ?"; 
  pool.query(sql, req.session.authed, (err, result) => {
    if(err) return res.status(400).json("Impossible de récuperer les thèmes");
    return res.status(200).json(result);
  });
});

module.exports = router;