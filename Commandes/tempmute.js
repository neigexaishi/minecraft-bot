const Discord = require("discord.js");
const ms = require("ms");

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
                    description: "Veuillez mentionner un utilisateur à réduire au silence !\n**Usage:** `neige!tempmute @utilisateur <temps> [raison]`",
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

        if (member.id === message.author.id) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Vous ne pouvez pas vous réduire au silence vous-même !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (member.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Vous ne pouvez pas réduire au silence cet utilisateur car il a un rôle égal ou supérieur au vôtre !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const time = args[1];
        if (!time) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez spécifier une durée !\n**Exemples:** `1m`, `30s`, `1h`, `1d`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const timeMs = ms(time);
        if (!timeMs || timeMs < 1000) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Durée invalide ! Utilisez des formats comme `1m`, `30s`, `1h`, `1d`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (timeMs > ms('7d')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "La durée ne peut pas dépasser 7 jours !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const reason = args.slice(2).join(' ') || 'Aucune raison spécifiée';
        const muteRole = message.guild.roles.find(r => r.name.toLowerCase() === 'muted');

        if (!muteRole) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Le rôle `Muted` n'existe pas ! Créez un rôle nommé `Muted` pour utiliser cette commande.",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (member.roles.has(muteRole.id)) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: `${member.user.tag} est déjà réduit au silence !`,
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        await member.addRole(muteRole.id);

        const muteEmbed = new Discord.RichEmbed()
            .setColor("#ffce00")
            .setTitle("🔇 Utilisateur réduit au silence")
            .addField("👤 Utilisateur", `${member.user.tag} (${member.id})`, true)
            .addField("👮 Modérateur", `${message.author.tag}`, true)
            .addField("⏰ Durée", ms(timeMs, { long: true }), true)
            .addField("📝 Raison", reason, false)
            .setThumbnail(member.user.displayAvatarURL)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        message.channel.send(muteEmbed);

        try {
            await member.user.send({
                embed: {
                    color: 0xffce00,
                    title: "🔇 Vous avez été réduit au silence",
                    description: `Vous avez été réduit au silence sur le serveur **${message.guild.name}**`,
                    fields: [
                        { name: "👮 Modérateur", value: message.author.tag, inline: true },
                        { name: "⏰ Durée", value: ms(timeMs, { long: true }), inline: true },
                        { name: "📝 Raison", value: reason, inline: false }
                    ],
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        } catch (error) {
            console.log("Impossible d'envoyer un MP à l'utilisateur réduit au silence");
        }

        setTimeout(async () => {
            try {
                if (member.roles.has(muteRole.id)) {
                    await member.removeRole(muteRole.id);
                    
                    const unmuteEmbed = new Discord.RichEmbed()
                        .setColor("#00ff00")
                        .setTitle("🔊 Utilisateur non réduit au silence")
                        .setDescription(`${member.user.tag} n'est plus réduit au silence !`)
                        .setThumbnail(member.user.displayAvatarURL)
                        .setFooter("NeigeMC | By Neige")
                        .setTimestamp();

                    message.channel.send(unmuteEmbed);
                }
            } catch (error) {
                console.error('Erreur lors du unmute automatique:', error);
            }
        }, timeMs);

    } catch (error) {
        console.error('Erreur dans la commande tempmute:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de la réduction au silence de l'utilisateur.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: "tempmute",
    description: "Réduit temporairement un utilisateur au silence",
    usage: "neige!tempmute @utilisateur <temps> [raison]",
    category: "Modération"
};
