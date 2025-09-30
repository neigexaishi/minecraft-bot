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

        if (message.mentions.users.size === 0) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez mentionner un utilisateur à ne plus réduire au silence !\n**Usage:** `neige!unmute @utilisateur`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Utilisateur introuvable sur ce serveur !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const muteRole = message.guild.roles.find(r => r.name.toLowerCase() === 'muted');
        if (!muteRole) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Le rôle `Muted` n'existe pas !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (!member.roles.has(muteRole.id)) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: `${member.user.tag} n'est pas réduit au silence !`,
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        await member.removeRole(muteRole.id);

        const unmuteEmbed = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setTitle("🔊 Utilisateur non réduit au silence")
            .addField("👤 Utilisateur", `${member.user.tag} (${member.id})`, true)
            .addField("👮 Modérateur", `${message.author.tag}`, true)
            .setThumbnail(member.user.displayAvatarURL)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        message.channel.send(unmuteEmbed);

        try {
            await member.user.send({
                embed: {
                    color: 0x00ff00,
                    title: "🔊 Vous n'êtes plus réduit au silence",
                    description: `Vous n'êtes plus réduit au silence sur le serveur **${message.guild.name}**`,
                    fields: [
                        { name: "👮 Modérateur", value: message.author.tag, inline: true }
                    ],
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        } catch (error) {
            console.log("Impossible d'envoyer un MP à l'utilisateur");
        }

    } catch (error) {
        console.error('Erreur dans la commande unmute:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de la suppression du silence de l'utilisateur.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: "unmute",
    description: "Retire le silence d'un utilisateur",
    usage: "neige!unmute @utilisateur",
    category: "Modération"
};
