# Bot Discord NeigeMC - Version 2.0

Un bot Discord moderne et amélioré pour le serveur NeigeMC avec des fonctionnalités de modération, d'administration et d'utilitaires.

## 🚀 Améliorations apportées

### ✨ Nouvelles fonctionnalités
- **Système de configuration centralisé** (`config.js`)
- **Gestion d'erreurs robuste** avec try/catch
- **Messages d'erreur informatifs** avec embeds Discord
- **Validation des permissions** améliorée
- **Système d'aliases** pour les commandes
- **Filtre de langage** amélioré
- **Logs détaillés** pour le débogage

### 🛡️ Sécurité renforcée
- Vérification des permissions avant exécution
- Protection contre l'auto-modération
- Validation des rôles et hiérarchies
- Limites de temps et de quantité

### 🎨 Interface utilisateur améliorée
- Embeds Discord cohérents
- Couleurs et emojis standardisés
- Messages d'erreur clairs et informatifs
- Confirmations visuelles des actions

## 📋 Commandes disponibles

### 🛡️ Modération
- `neige!kick @utilisateur [raison]` - Expulse un utilisateur
- `neige!ban @utilisateur [raison]` - Bannit un utilisateur
- `neige!tempmute @utilisateur <temps> [raison]` - Réduit au silence temporairement
- `neige!unmute @utilisateur` - Retire le silence
- `neige!clear <nombre>` - Supprime des messages

### ⚙️ Administration
- `neige!addrole <nom du rôle>` - Ajoute un rôle à l'utilisateur
- `neige!delrole <nom du rôle>` - Retire un rôle à l'utilisateur
- `neige!neige` - Ajoute le rôle Membre

### 🔧 Utilitaires
- `neige!help [commande]` - Affiche l'aide
- `neige!ping` - Affiche la latence du bot
- `neige!stats [@utilisateur]` - Statistiques d'un utilisateur
- `neige!uptime` - Temps de fonctionnement du bot
- `neige!suggest <suggestion>` - Crée un sondage
- `neige!urban <terme>` - Recherche dans le dictionnaire urbain
- `neige!ticket` - Crée un ticket de support
- `neige!ip` - Informations du serveur Minecraft

## 🛠️ Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd bot-minecraft
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration**
   - Modifiez le fichier `config.js`
   - Ajoutez votre token Discord
   - Configurez les IDs des channels et rôles

4. **Lancer le bot**
   ```bash
   node index.js
   ```

## ⚙️ Configuration

### Fichier `config.js`
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
    },
    roles: {
        muted: 'Muted',
        member: 'Membre'
    }
};
```

## 📁 Structure du projet

```
bot-minecraft/
├── Commandes/           # Commandes du bot
│   ├── addrole.js
│   ├── ban.js
│   ├── clear.js
│   ├── delrole.js
│   ├── help.js
│   ├── kick.js
│   ├── neige.js
│   ├── ping.js
│   ├── stats.js
│   ├── suggest.js
│   ├── tempmute.js
│   ├── ticket.js
│   ├── unmute.js
│   ├── uptime.js
│   └── Urban.js
├── Events/              # Événements Discord
│   ├── message.js
│   └── ready.js
├── config.js            # Configuration centralisée
├── index.js             # Fichier principal
├── package.json         # Dépendances
└── README.md           # Documentation
```

## 🔧 Dépendances

- `discord.js` ^11.5.1 - API Discord
- `moment` ^2.24.0 - Gestion des dates
- `ms` ^2.1.2 - Conversion de temps
- `snekfetch` ^4.0.4 - Requêtes HTTP

## 🚨 Permissions requises

Le bot nécessite les permissions suivantes :
- `SEND_MESSAGES` - Envoyer des messages
- `MANAGE_MESSAGES` - Gérer les messages
- `KICK_MEMBERS` - Expulser des membres
- `BAN_MEMBERS` - Bannir des membres
- `MANAGE_ROLES` - Gérer les rôles
- `MANAGE_CHANNELS` - Gérer les channels
- `EMBED_LINKS` - Intégrer des liens
- `ATTACH_FILES` - Joindre des fichiers

## 🐛 Résolution de problèmes

### Le bot ne répond pas
- Vérifiez que le token est correct
- Assurez-vous que le bot a les bonnes permissions
- Vérifiez les logs dans la console

### Erreurs de permissions
- Vérifiez la hiérarchie des rôles
- Assurez-vous que le bot a un rôle supérieur aux utilisateurs à modérer

### Commandes non reconnues
- Vérifiez l'orthographe de la commande
- Utilisez `neige!help` pour voir toutes les commandes disponibles

## 📝 Changelog

### Version 2.0.0
- ✅ Refonte complète du système de commandes
- ✅ Amélioration de la gestion d'erreurs
- ✅ Ajout d'un système de configuration
- ✅ Interface utilisateur modernisée
- ✅ Sécurité renforcée
- ✅ Documentation complète

## 👨‍💻 Développeur

**Neige** - Créateur et mainteneur du bot

## 📄 Licence

Ce projet est sous licence ISC.

---

*Bot Discord NeigeMC - Version 2.0 | Développé avec ❤️ par Neige*
