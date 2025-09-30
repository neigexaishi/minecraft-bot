module.exports = {
    // Configuration du bot
    bot: {
        token: '', // Votre token Discord
        prefix: 'neige!',
        ownerID: '', // Votre ID Discord
        version: '2.0.0'
    },

    // Configuration des couleurs
    colors: {
        primary: '#ffce00',
        success: '#00ff00',
        error: '#ff0000',
        warning: '#ffff00',
        info: '#4285F4'
    },

    // Configuration des emojis
    emojis: {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        loading: '⏳'
    },

    // Configuration des permissions
    permissions: {
        admin: ['ADMINISTRATOR'],
        moderator: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
        staff: ['MANAGE_ROLES', 'MANAGE_CHANNELS']
    },

    // Configuration des channels
    channels: {
        welcome: '689123152986767432',
        leave: '689123154932793348',
        tickets: '689123145973628949'
    },

    // Configuration des rôles
    roles: {
        muted: 'Muted',
        member: 'Membre',
        staff: ['Staff', 'Modérateur', '@management']
    },

    // Configuration des limites
    limits: {
        clear: {
            min: 1,
            max: 100
        },
        tempmute: {
            max: '7d'
        },
        suggest: {
            maxLength: 1000
        }
    },

    // Messages par défaut
    messages: {
        noPermission: "Vous n'avez pas la permission d'utiliser cette commande !",
        botNoPermission: "Le bot n'a pas la permission nécessaire !",
        userNotFound: "Utilisateur introuvable !",
        error: "Une erreur s'est produite !",
        success: "Commande exécutée avec succès !"
    }
};
