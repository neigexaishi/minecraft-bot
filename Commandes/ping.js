const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    try {
        const debut = Date.now();
        const msg = await message.channel.send("🏓 Pong...");
        
        const latence = Date.now() - debut;
        const apiLatence = Math.round(client.ping);
        
        let couleur = 0x00ff00; // Vert
        let statut = "🟢 Excellent";
        
        if (latence > 200 || apiLatence > 200) {
            couleur = 0xff0000; // Rouge
            statut = "🔴 Lent";
        } else if (latence > 100 || apiLatence > 100) {
            couleur = 0xffff00; // Jaune
            statut = "🟡 Moyen";
        }

        const embed = new Discord.RichEmbed()
            .setColor(couleur)
            .setTitle("🏓 Pong!")
            .addField("📡 Latence du bot", `${latence}ms`, true)
            .addField("🌐 Latence de l'API", `${apiLatence}ms`, true)
            .addField("📊 Statut", statut, true)
            .setFooter(`Demandé par ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp();

        msg.edit(embed);
    } catch (error) {
        console.error('Erreur dans la commande ping:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Impossible de calculer la latence.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: "ping",
    description: "Affiche la latence du bot et de l'API Discord",
    usage: "neige!ping",
    category: "Utilitaires"
}