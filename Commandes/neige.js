const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        const member = message.member;
        const role = message.guild.roles.find(r => r.name.toLowerCase() === 'membre');

        if (!role) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Le rôle `Membre` n'existe pas sur ce serveur !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (member.roles.has(role.id)) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: `Vous avez déjà le rôle ${role.toString()} !`,
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        await member.addRole(role.id);

        const successEmbed = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setTitle("✅ Rôle ajouté")
            .setDescription(`Vous avez reçu le rôle ${role.toString()} !`)
            .setThumbnail(message.author.displayAvatarURL)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        message.channel.send(successEmbed);

    } catch (error) {
        console.error('Erreur dans la commande neige:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de l'ajout du rôle.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: 'neige',
    description: 'Ajoute le rôle Membre à l\'utilisateur',
    usage: 'neige!neige',
    category: 'Administration'
};