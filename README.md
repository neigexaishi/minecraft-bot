# Bot Discord Minecraft

Un bot Discord moderne et amélioré pour Minecraft avec des fonctionnalités de modération, d'administration et d'utilitaires.

---

## 🌿 Menu

• [📦 Deploy With](#-deploys)  
• [⚙️ Setting up](#-setting-up)  
• [💼 Features](#-features)  
• [🧑‍🤝‍🧑 Authors](#-authors)  
• [⚔️ Discord](#-discord)

---

## 📦 Deploys

[![Run on Replit](https://img.shields.io/badge/Replit-667881?style=for-the-badge&logo=replit&logoColor=white)](https://replit.com/github/neigexaishi/minecraft-bot)
[![Remix on Glitch](https://img.shields.io/badge/Glitch-2800ff?style=for-the-badge&logo=glitch&logoColor=white)](https://glitch.com/edit/#!/import/github/neigexaishi/minecraft-bot)
[![Deploy to Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://heroku.com/deploy?template=https://github.com/neigexaishi/minecraft-bot)
[![Deploy on Railway](https://img.shields.io/badge/Railway-131B24?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/template/neigexaishi/minecraft-bot)

---

## ⚙️ Setting up

1. [Install NodeJS](https://nodejs.org/)
2. [Install Files](https://github.com/neigexaishi/minecraft-bot/archive/refs/heads/main.zip)
3. Complete the configuration in `config.js`
4. Enjoy the tool!

---

## 💼 Features

### 🛡️ Modération
- **Kick/Ban** - Gestion des sanctions avec raisons
- **Mute temporaire** - Réduction au silence avec durée personnalisée
- **Clear** - Suppression de messages en masse
- **Filtre de langage** - Protection automatique contre les gros mots

### ⚙️ Administration
- **Gestion des rôles** - Ajout/suppression de rôles
- **Système de tickets** - Support automatisé
- **Logs détaillés** - Traçabilité des actions

### 🔧 Utilitaires
- **Statistiques** - Informations sur les utilisateurs
- **Ping** - Latence du bot et de l'API
- **Sondages** - Création de votes interactifs
- **Dictionnaire urbain** - Recherche de définitions
- **Uptime** - Temps de fonctionnement

---

## 📋 Commandes

| Commande | Description | Permission |
|----------|-------------|------------|
| `neige!kick @user [raison]` | Expulse un utilisateur | KICK_MEMBERS |
| `neige!ban @user [raison]` | Bannit un utilisateur | BAN_MEMBERS |
| `neige!tempmute @user <temps> [raison]` | Mute temporaire | MANAGE_MESSAGES |
| `neige!clear <nombre>` | Supprime des messages | MANAGE_MESSAGES |
| `neige!stats [@user]` | Statistiques utilisateur | - |
| `neige!ping` | Latence du bot | - |
| `neige!suggest <texte>` | Crée un sondage | - |
| `neige!ticket` | Crée un ticket | - |

---

## 🛠️ Configuration

Créez un fichier `config.js` avec vos paramètres :

```javascript
module.exports = {
    bot: {
        token: 'VOTRE_TOKEN_DISCORD',
        prefix: 'neige!',
        ownerID: 'VOTRE_ID_DISCORD'
    },
    channels: {
        welcome: 'ID_CHANNEL_WELCOME',
        leave: 'ID_CHANNEL_LEAVE',
        tickets: 'ID_CATEGORY_TICKETS'
    }
};
```

---

## 📁 Structure

```
minecraft-bot/
├── Commandes/           # Toutes les commandes
├── Events/              # Événements Discord
├── config.js            # Configuration
├── index.js             # Point d'entrée
└── package.json         # Dépendances
```

---

## 🔧 Dépendances

- `discord.js` - API Discord officielle
- `moment` - Gestion des dates
- `ms` - Conversion de temps
- `snekfetch` - Requêtes HTTP

---

## 🚨 Permissions

Le bot a besoin de ces permissions :
- `SEND_MESSAGES` - Envoyer des messages
- `MANAGE_MESSAGES` - Gérer les messages
- `KICK_MEMBERS` - Expulser des membres
- `BAN_MEMBERS` - Bannir des membres
- `MANAGE_ROLES` - Gérer les rôles
- `MANAGE_CHANNELS` - Gérer les channels
- `EMBED_LINKS` - Intégrer des liens

---

## 📜 Terms Of Usage

✅ **Usage éducatif uniquement**  
✅ **Vous pouvez utiliser le code source si vous gardez les crédits (dans les embeds + dans le markdown), il doit rester open-source**  
✅ **Nous ne sommes PAS responsables de ce que vous faites avec notre logiciel (si c'est illégal)**

---

## 🧑‍🤝‍🧑 Authors

• [Neige](https://github.com/neigexaishi) - Créateur principal  
• [Contributeurs](https://github.com/neigexaishi/minecraft-bot/graphs/contributors) - Merci à tous !

---

## ⚔️ Discord

[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/suzume)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/users/267757747653705728)

---

*Développé avec ❤️ pour la communauté Minecraft*

