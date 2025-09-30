const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    try {
        const uptime = client.uptime;
        const cMS = convertMS(uptime);
        
        const uptimeString = 
            `${cMS.d} jour${cMS.d > 1 ? 's' : ''}, ` +
            `${cMS.h} heure${cMS.h > 1 ? 's' : ''}, ` +
            `${cMS.m} minute${cMS.m > 1 ? 's' : ''} et ` +
            `${cMS.s} seconde${cMS.s > 1 ? 's' : ''}`;

        const uptimeEmbed = new Discord.RichEmbed()
            .setColor("#ffce00")
            .setTitle("⏰ Temps de fonctionnement")
            .setDescription(`Le bot est en ligne depuis **${uptimeString}**`)
            .addField("📊 Statistiques", 
                `**Serveurs:** ${client.guilds.size}\n` +
                `**Utilisateurs:** ${client.users.size}\n` +
                `**Channels:** ${client.channels.size}\n` +
                `**Commandes:** ${client.commands.size}`, true)
            .addField("🔧 Informations techniques", 
                `**Node.js:** ${process.version}\n` +
                `**Discord.js:** v${Discord.version}\n` +
                `**Mémoire:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .setThumbnail(client.user.displayAvatarURL)
            .setFooter("NeigeMC | By Neige", client.user.displayAvatarURL)
            .setTimestamp();

        message.channel.send(uptimeEmbed);
        message.delete().catch(() => {});
    } catch (error) {
        console.error('Erreur dans la commande uptime:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de l'affichage du temps de fonctionnement.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

function convertMS(ms) {
    const d = Math.floor(ms / (1000 * 60 * 60 * 24));
    const h = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);
    
    return { d, h, m, s };
}

module.exports.help = {
    name: "uptime",
    description: "Affiche le temps de fonctionnement du bot et ses statistiques",
    usage: "neige!uptime",
    category: "Utilitaires"
};