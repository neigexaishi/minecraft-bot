const config = require('../config');

module.exports = async (client) => {
    console.log(`🤖 ${client.user.tag} est maintenant en ligne !`);
    console.log(`📊 Serveurs: ${client.guilds.size} | Utilisateurs: ${client.users.size}`);
    
    // Statut du bot
    client.user.setStatus('online');
    client.user.setPresence({
        game: {
            name: `${config.bot.prefix}help - ${client.guilds.size} serveurs`,
            type: "WATCHING"
        }
    });

    // Mise à jour du statut toutes les 30 minutes
    setInterval(() => {
        client.user.setPresence({
            game: {
                name: `${config.bot.prefix}help - ${client.guilds.size} serveurs`,
                type: "WATCHING"
            }
        });
    }, 1800000);
};