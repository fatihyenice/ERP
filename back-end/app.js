const express = require('express')
const mysql2 = require('mysql2')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());

const db = mysql2.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'erp'
});

db.connect((err) => {
    if(err){
        console.error("Impossible de se connecter à la base de donnée");
        return;
    }
    console.log("Connexion réussie !");
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getThemes', async (req, res) => { 
  const getAllThemeSql = "SELECT * FROM themes"

  db.query(getAllThemeSql, (err, result) => {
    if(err){
        return res.status(400).json("Impossible de récuperer les thèmes");
    }

    return res.status(200).json(result);
  })
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
