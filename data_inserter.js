// fichier permettant une insertion régulière de nouvelles données pour simuler une mesure en temps réel

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

// initialisation des valeurs de base pour chaque capteur (milieu de l'intervalle)
let temp_pipe1 = 305;        // (290 + 320) / 2
let temp_pipe2 = 280;        // (270 + 290) / 2
let temp_pipe3 = 32.5;       // (25 + 40) / 2
let pressure_valve1 = 148.5; // (140 + 157) / 2
let pressure_valve2 = 55;     // (50 + 60) / 2
let pressure_valve3 = 6;      // (2 + 10) / 2
let radiation = 1.5;          // (0.5 + 2.5) / 2

// Fonction pour générer un petit changement aléatoire
function getRandomDelta(maxDelta) {
    return (Math.random() * (2 * maxDelta) - maxDelta); // Entre -maxDelta et +maxDelta
}

// Fonction pour générer des données réalistes
function generateRandomData() {
    // Appliquer de petits changements à chaque capteur
    temp_pipe1 = Math.min(320, Math.max(290, temp_pipe1 + getRandomDelta(1))); // ±1°C
    temp_pipe2 = Math.min(290, Math.max(270, temp_pipe2 + getRandomDelta(1))); // ±1°C
    temp_pipe3 = Math.min(40, Math.max(25, temp_pipe3 + getRandomDelta(0.5))); // ±0.5°C

    pressure_valve1 = Math.min(157, Math.max(140, pressure_valve1 + getRandomDelta(0.5))); // ±0.5 bar
    pressure_valve2 = Math.min(60, Math.max(50, pressure_valve2 + getRandomDelta(0.3)));  // ±0.3 bar
    pressure_valve3 = Math.min(10, Math.max(2, pressure_valve3 + getRandomDelta(0.2)));   // ±0.2 bar

    radiation = Math.min(2.5, Math.max(0.5, radiation + getRandomDelta(0.1)));         // ±0.1 µSv/h

    return {
        temp_pipe1: temp_pipe1.toFixed(2),
        temp_pipe2: temp_pipe2.toFixed(2),
        temp_pipe3: temp_pipe3.toFixed(2),
        pressure_valve1: pressure_valve1.toFixed(2),
        pressure_valve2: pressure_valve2.toFixed(2),
        pressure_valve3: pressure_valve3.toFixed(2),
        radiation: radiation.toFixed(3)
    };
}

// Fonction pour insérer les données dans PostgreSQL
async function insertData() {
    const data = generateRandomData();
    try {
        console.log("Avant insertion...");
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

// Exécution de l'insertion toutes les 3 secondes
const intervalMs = 3000; // 3 secondes
setInterval(insertData, intervalMs);

console.log("📡 Script d'insertion de données lancé. CTRL+C pour arrêter.");
