const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = (client, message, args) => {
    try {
        const membre = message.mentions.members.first() || message.member;
        
        if (!membre) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Utilisateur introuvable !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const roles = membre.roles
            .filter(role => role.id !== message.guild.id)
            .map(role => role.name)
            .join(', ') || 'Aucun rôle';

        const status = {
            'online': '🟢 En ligne',
            'idle': '🟡 Absent',
            'dnd': '🔴 Ne pas déranger',
            'offline': '⚫ Hors ligne'
        };

        const embed = new Discord.RichEmbed()
            .setColor("#ffce00")
            .setAuthor(`Statistiques de ${membre.user.username}`, membre.user.displayAvatarURL)
            .setThumbnail(membre.user.displayAvatarURL)
            .addField('👤 **Informations générales**', 
                `**Nom d'utilisateur:** ${membre.user.username}\n` +
                `**Tag:** ${membre.user.tag}\n` +
                `**ID:** ${membre.id}\n` +
                `**Statut:** ${status[membre.user.presence.status] || '⚫ Hors ligne'}`, true)
            .addField('📅 **Dates importantes**', 
                `**Compte créé:** ${moment(membre.user.createdAt).format('DD/MM/YYYY à HH:mm')}\n` +
                `**A rejoint le serveur:** ${moment(membre.joinedAt).format('DD/MM/YYYY à HH:mm')}\n` +
                `**Âge du compte:** ${moment().diff(moment(membre.user.createdAt), 'days')} jours`, true)
            .addField('🎮 **Activité**', 
                membre.user.presence.game ? 
                `**Joue à:** ${membre.user.presence.game.name}` : 
                '**Aucune activité**', true)
            .addField('🎭 **Rôles**', roles.length > 1024 ? 'Trop de rôles à afficher' : roles, false)
            .setFooter(`Demandé par ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp();

        message.channel.send(embed);
    } catch (error) {
        console.error('Erreur dans la commande stats:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de la récupération des statistiques.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: 'stats',
    description: 'Affiche les statistiques d\'un utilisateur',
    usage: 'neige!stats [@utilisateur]',
    category: 'Utilitaires'
};