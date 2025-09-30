const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Permission refusée",
                    description: "Vous n'avez pas la permission `BAN_MEMBERS` !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Permission refusée",
                    description: "Le bot n'a pas la permission `BAN_MEMBERS` !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (message.mentions.users.size === 0) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez mentionner un utilisateur à bannir !\n**Usage:** `neige!ban @utilisateur [raison]`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const banMember = message.guild.member(message.mentions.users.first());
        if (!banMember) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Utilisateur introuvable sur ce serveur !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (banMember.id === message.author.id) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Vous ne pouvez pas vous bannir vous-même !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (banMember.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Vous ne pouvez pas bannir cet utilisateur car il a un rôle égal ou supérieur au vôtre !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

        const banEmbed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setTitle("🔨 Utilisateur banni")
            .addField("👤 Utilisateur", `${banMember.user.tag} (${banMember.id})`, true)
            .addField("👮 Modérateur", `${message.author.tag}`, true)
            .addField("📝 Raison", reason, false)
            .setThumbnail(banMember.user.displayAvatarURL)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        try {
            await banMember.user.send({
                embed: {
                    color: 0xff0000,
                    title: "🔨 Vous avez été banni",
                    description: `Vous avez été banni du serveur **${message.guild.name}**`,
                    fields: [
                        { name: "👮 Modérateur", value: message.author.tag, inline: true },
                        { name: "📝 Raison", value: reason, inline: true }
                    ],
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        } catch (error) {
            console.log("Impossible d'envoyer un MP à l'utilisateur banni");
        }

        await banMember.ban({ reason: reason });
        message.channel.send(banEmbed);

    } catch (error) {
        console.error('Erreur dans la commande ban:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors du bannissement de l'utilisateur.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: 'ban',
    description: 'Bannit un utilisateur du serveur',
    usage: 'neige!ban @utilisateur [raison]',
    category: 'Modération'
};