# Projet 3APIS

## Description

L'une des fonctionnalités clés de cette API est la possibilité pour les utilisateurs de "réserver" des billets de train d'un arrêt à un autre. Cela simplifie considérablement le processus de planification et de réservation pour les voyages quotidiens ou occasionnels.

En outre, l'API offre une interface spéciale pour certains utilisateurs, que nous appellerons les "employés". Cette interface permet aux employés de vérifier la validité des billets. Cela est essentiel pour maintenir l'intégrité du système de billetterie et assurer une expérience utilisateur fluide et sécurisée.

## Fonctionnalités

Listez les fonctionnalités clés de votre projet. Par exemple :
- Authentification des utilisateurs (inscription, connexion, déconnexion)
- Système de réservation de billets
- Gestion des trains (créer, mettre à jour, supprimer des trains)
- Gestion des gares (créer, mettre à jour, supprimer des gares)
- Gestion des utilisateurs (créer, afficher, mettre à jour, supprimer des utilisateurs)

## Pour Commencer

### Prérequis

- Node.js (version supérieure à 20.10.0 LTS)
- MongoDB

### Installation

Guide étape par étape pour configurer le projet localement.

```bash
# Cloner le dépôt
git clone git@github.com:s1nyx/supinfo-eng3-3apis-projet.git

# Naviguer vers le répertoire du projet
cd supinfo-eng3-3apis-projet

# Installer les dépendances
npm install

# Démarrer le serveur
npm start
```

## Informations relatifs à l'API et son architecture

### Structure de Dossiers

L'application est structurée de manière à séparer clairement les différentes parties du code pour faciliter la maintenance et l'évolutivité.

#### `src/`
Contient l'ensemble du code source de l'application.
- `models/`: Définitions des modèles de données Mongoose.
- `routes/`: Définitions des routes Express pour différentes fonctionnalités.
- `controllers/`: Logique métier pour manipuler les modèles en réponse aux requêtes HTTP.
- `middlewares/`: Middlewares Express pour l'authentification, la validation des requêtes, la gestion des erreurs, etc.
- `validators/`: Validation des données des requêtes HTTP reçues.

#### `tests/`
Contient les tests unitaires et d'intégration.

### Configuration et Dépendances

#### package.json

Le fichier `package.json` définit les scripts et les dépendances nécessaires pour l'application.

#### init.js

Le fichier init.js initialise l'application et configure les dépendances principales.

#### .env

Le fichier `.env` contient les variables d'environnement nécessaires à l'application, il s'appuit sur `.env.example`.

### Sécurité et Authentification

- L'authentification est gérée via Passport.js avec des stratégies locales et de session.
- Les mots de passe sont sécurisés à l'aide d'un hash.
- Les variables d'environnement sont utilisées pour sécuriser les clés et configurations sensibles.

### Tests

Les tests unitaires sont écrits avec Mocha et peuvent être exécutés avec la commande `npm test`