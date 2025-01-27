# Nuclear Monitor

Bienvenue sur **Nuclear Monitor** ! 🌟

Nuclear Monitor est une application web conçue pour surveiller en temps réel les capteurs de température et de pression d'une centrale nucléaire. Grâce à des graphiques interactifs, vous pouvez visualiser les données collectées et suivre l'évolution des mesures au fil du temps.

Video de présentation : https://youtu.be/UEIKXnJ5Hrs

## Technologies Utilisées

- **Frontend :**
  - HTML5 & CSS3
  - JavaScript
  - [Chart.js](https://www.chartjs.org/) pour les graphiques
  - [Material Design Icons](https://materialdesignicons.com/) pour les icônes

- **Backend :**
  - [Node.js](https://nodejs.org/) avec [Express.js](https://expressjs.com/)
  - [pg](https://node-postgres.com/) pour interagir avec PostgreSQL

- **Base de Données :**
  - [PostgreSQL](https://www.postgresql.org/)
  - [pgAdmin 4](https://www.pgadmin.org/) pour gérer la base de données via une interface graphique


## Pré-requis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Node.js et npm** : [Télécharger et installer Node.js](https://nodejs.org/)
- **PostgreSQL** : [Télécharger et installer PostgreSQL](https://www.postgresql.org/download/)
- **pgAdmin 4** (optionnel, mais recommandé pour gérer PostgreSQL facilement) : [Télécharger pgAdmin 4](https://www.pgadmin.org/download/)
- **Git** (optionnel, pour cloner le dépôt)

## Installation

### 1. Cloner le Répertoire

Si vous utilisez Git, clonez le dépôt. Sinon, téléchargez et extrayez les fichiers du projet.

```bash
git clone https://github.com/sidneygitteau/nuclear-monitor.git
cd nuclear-monitor
```

### 2. Installer les Dépendances

Assurez-vous d'être dans le répertoire du projet, puis exécutez :
```
npm install
```
Cela installera toutes les dépendances nécessaires listées dans le fichier package.json.
## Configuration
### 1. Configurer la Base de Données PostgreSQL
a. Créer la Base de Données

Ouvrez pgAdmin 4 ou utilisez le terminal pour créer une base de données nommée nuclear_db :
```SQL
CREATE DATABASE nuclear_db;
```
b. Créer la Table nuclear_measurements

Connectez-vous à la base de données nuclear_db et exécutez la requête suivante pour créer la table :
```sql
CREATE TABLE nuclear_measurements (
    id SERIAL PRIMARY KEY,
    temp_pipe1 NUMERIC,
    temp_pipe2 NUMERIC,
    temp_pipe3 NUMERIC,
    pressure_valve1 NUMERIC,
    pressure_valve2 NUMERIC,
    pressure_valve3 NUMERIC,
    radiation NUMERIC,
    timestamp TIMESTAMP DEFAULT NOW()
);
```

### 2. Configurer les Variables d'Environnement

Créez un fichier .env à la racine du projet et ajoutez vos informations de connexion PostgreSQL :
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=nuclear_db
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432
```
Remplacez votre_mot_de_passe par le mot de passe de votre utilisateur PostgreSQL.
# Démarrage de l'Application
## 1. Démarrer le Serveur Node.js

Dans le terminal, exécutez :
```
node app.js
```
Vous devriez voir un message indiquant que le serveur a démarré et que la connexion à PostgreSQL a réussi :

Serveur démarré sur le port 3000
Connexion à PostgreSQL réussie !

## 2. Lancer le Script d'Insertion des Données

Dans un autre terminal, lancez le script d'insertion pour simuler les mesures en temps réel :
```
node data_inserter.js
```
Vous verrez des messages indiquant la création et l'insertion des données :
```
📡 Script d'insertion de données lancé. CTRL+C pour arrêter.
Création des données...
Avant insertion...
[✅] Données insérées : { temp_pipe1: '305.12', temp_pipe2: '280.45', temp_pipe3: '32.50', pressure_valve1: '148.30', pressure_valve2: '55.20', pressure_valve3: '6.10', radiation: '1.520' }
```
Ouvrez votre navigateur et accédez aux URL suivantes pour visualiser les données en temps réel :

    Accueil : http://localhost:3000/
    Températures : http://localhost:3000/temperature
    Pression : http://localhost:3000/pression


### Améliorations Futures

Voici quelques idées pour rendre l'application encore meilleure :

Alertes en Temps Réel :  
Mettre en place des notifications en cas de dépassement des seuils de pression ou de température.   
Tests :   
Ajouter des tests unitaires et d'intégration pour assurer la fiabilité de l'application.   
