//fichier permettant une insertion regulière de nouvelles données pour simuler une mesure en temps reel

require('dotenv').config(); // Charger les variables d'environnement

const { Pool } = require('pg');

// Connexion à la base de données
const pool = new Pool({
    user: process.env.DB_USER,         
    host: process.env.DB_HOST,          
    database: process.env.DB_NAME,      
    password: process.env.DB_PASSWORD,  
    port: process.env.DB_PORT    
});

// Fonction pour générer des valeurs aléatoires réalistes
function generateRandomData() {
    console.log("on a créé les données")
    return {
        temp_pipe1: (Math.random() * (320 - 290) + 290).toFixed(2),  // 290 à 320 degrés
        temp_pipe2: (Math.random() * (290 - 270) + 270).toFixed(2),  // 270 à 290 degrés
        temp_pipe3: (Math.random() * (40 - 25) + 25).toFixed(2),     // 25 à 40 degrés
        pressure_valve1: (Math.random() * (157 - 140) + 140).toFixed(2), // 140 à 157 bars
        pressure_valve2: (Math.random() * (60 - 50) + 50).toFixed(2), // 50 à 60 bars
        pressure_valve3: (Math.random() * (10 - 2) + 2).toFixed(2),   // 2 à 10 bars
        radiation: (Math.random() * (2.5 - 0.5) + 0.5).toFixed(3)     // 0.5 à 2.5 µSv/h
    };
}

// Fonction pour insérer les données dans PostgreSQL
async function insertData() {
    const data = generateRandomData();
    try {
        console.log("avant insertion")
        await pool.query(
            `INSERT INTO nuclear_measurements 
            (temp_pipe1, temp_pipe2, temp_pipe3, pressure_valve1, pressure_valve2, pressure_valve3, radiation, timestamp) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
            [
                data.temp_pipe1,
                data.temp_pipe2,
                data.temp_pipe3,
                data.pressure_valve1,
                data.pressure_valve2,
                data.pressure_valve3,
                data.radiation
            ]
        );
        console.log(`[✅] Données insérées :`, data);
    } catch (err) {
        console.error("[❌] Erreur d'insertion :", err.message);
    }
}

// Exécution de l'insertion toutes les 10 secondes
setInterval(insertData, 10 * 1000);

console.log("📡 Script d'insertion de données lancé. CTRL+C pour arrêter.");
