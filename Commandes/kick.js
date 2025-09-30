const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Permission refusée",
                    description: "Vous n'avez pas la permission `KICK_MEMBERS` !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Permission refusée",
                    description: "Le bot n'a pas la permission `KICK_MEMBERS` !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (message.mentions.users.size === 0) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez mentionner un utilisateur à expulser !\n**Usage:** `neige!kick @utilisateur [raison]`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Utilisateur introuvable sur ce serveur !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (kickMember.id === message.author.id) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Vous ne pouvez pas vous expulser vous-même !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (kickMember.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Vous ne pouvez pas expulser cet utilisateur car il a un rôle égal ou supérieur au vôtre !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

        const kickEmbed = new Discord.RichEmbed()
            .setColor("#ffce00")
            .setTitle("👢 Utilisateur expulsé")
            .addField("👤 Utilisateur", `${kickMember.user.tag} (${kickMember.id})`, true)
            .addField("👮 Modérateur", `${message.author.tag}`, true)
            .addField("📝 Raison", reason, false)
            .setThumbnail(kickMember.user.displayAvatarURL)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        try {
            await kickMember.user.send({
                embed: {
                    color: 0xff0000,
                    title: "👢 Vous avez été expulsé",
                    description: `Vous avez été expulsé du serveur **${message.guild.name}**`,
                    fields: [
                        { name: "👮 Modérateur", value: message.author.tag, inline: true },
                        { name: "📝 Raison", value: reason, inline: true }
                    ],
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        } catch (error) {
            console.log("Impossible d'envoyer un MP à l'utilisateur expulsé");
        }

        await kickMember.kick(reason);
        message.channel.send(kickEmbed);

    } catch (error) {
        console.error('Erreur dans la commande kick:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de l'expulsion de l'utilisateur.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: 'kick',
    description: 'Expulse un utilisateur du serveur',
    usage: 'neige!kick @utilisateur [raison]',
    category: 'Modération'
};