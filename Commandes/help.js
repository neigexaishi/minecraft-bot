const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    try {
        const prefix = 'neige!';
        const commands = client.commands;
        
        if (args[0]) {
            const command = commands.get(args[0]) || commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
            
            if (!command) {
                return message.channel.send({
                    embed: {
                        color: 0xff0000,
                        title: "❌ Commande introuvable",
                        description: `La commande \`${args[0]}\` n'existe pas !`,
                        footer: { text: "NeigeMC | By Neige" }
                    }
                });
            }

            const helpEmbed = new Discord.RichEmbed()
                .setColor("#ffce00")
                .setTitle(`📖 Aide - ${command.help.name}`)
                .addField("📝 Description", command.help.description || "Aucune description disponible", false)
                .addField("💡 Usage", `\`${prefix}${command.help.usage || command.help.name}\``, false)
                .addField("📂 Catégorie", command.help.category || "Non classée", false)
                .setFooter("NeigeMC | By Neige", client.user.displayAvatarURL)
                .setTimestamp();

            if (command.help.aliases) {
                helpEmbed.addField("🔗 Alias", command.help.aliases.join(', '), false);
            }

            return message.channel.send(helpEmbed);
        }

        const categories = {};
        commands.forEach(command => {
            const category = command.help.category || 'Autres';
            if (!categories[category]) categories[category] = [];
            categories[category].push(`\`${prefix}${command.help.name}\``);
        });

        const helpEmbed = new Discord.RichEmbed()
            .setColor("#ffce00")
            .setTitle("📚 Liste des commandes")
            .setDescription(`Utilisez \`${prefix}help <commande>\` pour plus d'informations sur une commande spécifique.`)
            .setThumbnail(client.user.displayAvatarURL)
            .setFooter("NeigeMC | By Neige", client.user.displayAvatarURL)
            .setTimestamp();

        Object.keys(categories).forEach(category => {
            const emojis = {
                'Modération': '🛡️',
                'Administration': '⚙️',
                'Utilitaires': '🔧',
                'Divertissement': '🎮',
                'Autres': '📋'
            };
            
            helpEmbed.addField(
                `${emojis[category] || '📋'} ${category}`,
                categories[category].join(' '),
                false
            );
        });

        helpEmbed.addField("🔗 Liens utiles", 
            "[Support](https://discord.gg/neigemc) • [Site web](https://neigemc.com) • [Inviter le bot](https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot)", // Inséré votre id du bot dans "YOUR_BOT_ID" , si vous voulez pas voir , supprimer " • [Inviter le bot](https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&" svp
            false
        );

        message.channel.send(helpEmbed);
    } catch (error) {
        console.error('Erreur dans la commande help:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de l'affichage de l'aide.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: "help",
    description: "Affiche la liste des commandes ou l'aide pour une commande spécifique",
    usage: "neige!help [commande]",
    category: "Utilitaires",
    aliases: ["aide", "commands"]
}
