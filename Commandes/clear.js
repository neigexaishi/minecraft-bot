const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Permission refusée",
                    description: "Vous n'avez pas la permission `MANAGE_MESSAGES` !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Permission refusée",
                    description: "Le bot n'a pas la permission `MANAGE_MESSAGES` !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (!args[0]) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez spécifier un nombre de messages à supprimer !\n**Usage:** `neige!clear <nombre>`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const amount = parseInt(args[0]);
        
        if (isNaN(amount)) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez spécifier un nombre valide !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (amount < 1 || amount > 100) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Le nombre doit être entre 1 et 100 !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const messages = await message.channel.fetchMessages({ limit: amount + 1 });
        const filtered = messages.filter(msg => !msg.pinned);
        
        if (filtered.size === 0) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Aucun message à supprimer trouvé !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        await message.channel.bulkDelete(filtered);
        
        const confirmEmbed = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setTitle("✅ Messages supprimés")
            .setDescription(`**${filtered.size}** messages ont été supprimés avec succès !`)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        const confirmMsg = await message.channel.send(confirmEmbed);
        setTimeout(() => confirmMsg.delete(), 5000);

    } catch (error) {
        console.error('Erreur dans la commande clear:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de la suppression des messages.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: 'clear',
    description: 'Supprime un nombre spécifié de messages',
    usage: 'neige!clear <nombre>',
    category: 'Modération'
};