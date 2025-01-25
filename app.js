require('dotenv').config(); //charger le .env

const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const { Pool } = require('pg');       // import du client postgre

// recuperation du pool de connexion postgresql

const pool = new Pool({
    user: process.env.DB_USER,         
    host: process.env.DB_HOST,          
    database: process.env.DB_NAME,      
    password: process.env.DB_PASSWORD,  
    port: process.env.DB_PORT           
  });
/*
const pool = new Pool({
    host: "192.168.1.43",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "nuclear_db"
})
*/
  pool.connect();

  // Test de la connexion 
pool.query('SELECT * from nuclear_measurements',(err,res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message)
    }
    pool.end();
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    // envoi du fichier accueil.html 
    res.sendFile(path.join(__dirname, '/public/pages/nucleaire', 'accueil.html'));
});

app.get('/temperature', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/pages/nucleaire','temperature.html'));
});

app.get('/pression', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/pages/nucleaire','pression.html'))
});

/*
// Exemple de route pour récupérer des mesures
app.get('/api/measurements', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM measurements LIMIT 20');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  });


const { spawn } = require('child_process');

const inserterProcess = spawn('node', ['data_inserter.js'], { stdio: 'inherit' });

inserterProcess.on('close', (code) => {
    console.log(`Le script d'insertion s'est arrêté avec le code ${code}`);
});
*/

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

