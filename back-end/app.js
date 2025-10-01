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

const authRouter = require('./routes/auth');
const themeRouter = require('./routes/themes');
const clientRouter = require('./routes/clients');

app.use("/auth", authRouter);
app.use("/themes", themeRouter);
app.use("/clients", clientRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
}) 
 

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`)
})
