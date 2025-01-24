const path = require('path');
const express = require('express');
const app = express();

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



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});