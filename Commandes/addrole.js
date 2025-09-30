const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        if (!args[0]) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez spécifier un nom de rôle !\n**Usage:** `neige!addrole <nom du rôle>`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Permission refusée",
                    description: "Vous n'avez pas la permission `MANAGE_ROLES` !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Permission refusée",
                    description: "Le bot n'a pas la permission `MANAGE_ROLES` !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const roleName = args.join(' ');
        const role = message.guild.roles.find(r => 
            r.name.toLowerCase() === roleName.toLowerCase() || 
            r.id === roleName
        );

        if (!role) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: `Le rôle \`${roleName}\` n'existe pas !`,
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (message.member.roles.has(role.id)) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: `Vous avez déjà le rôle ${role.toString()} !`,
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        if (role.position >= message.member.highestRole.position) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Vous ne pouvez pas vous donner ce rôle car il est égal ou supérieur à votre rôle le plus élevé !",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        await message.member.addRole(role.id);

        const successEmbed = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setTitle("✅ Rôle ajouté")
            .setDescription(`Vous avez désormais le rôle ${role.toString()} !`)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        message.channel.send(successEmbed);

    } catch (error) {
        console.error('Erreur dans la commande addrole:', error);
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
    name: 'addrole',
    description: 'Ajoute un rôle à l\'utilisateur qui exécute la commande',
    usage: 'neige!addrole <nom du rôle>',
    category: 'Administration'
};