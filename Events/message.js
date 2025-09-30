const Discord = require('discord.js');
const config = require('../config');

module.exports = async (client, message) => {
    // Ignorer les bots et les messages en DM
    if (message.author.bot || message.channel.type === 'dm') return;

    // Vérifier si le message commence par le préfixe
    if (!message.content.startsWith(config.bot.prefix)) return;

    // Extraire les arguments et la commande
    const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    // Récupérer la commande
    const command = client.commands.get(commandName) || 
                   client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    if (!command) return;

    // Vérifier les permissions si nécessaire
    if (command.help.permissions && command.help.permissions.length > 0) {
        const hasPermission = command.help.permissions.some(permission => 
            message.member.hasPermission(permission)
        );
        
        if (!hasPermission) {
            return message.channel.send({
                embed: {
                    color: config.colors.error,
                    title: "❌ Permission refusée",
                    description: `Vous n'avez pas la permission d'utiliser cette commande !\n**Permissions requises:** ${command.help.permissions.join(', ')}`,
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }
    }

    // Vérifier si la commande est en mode maintenance
    if (command.help.maintenance) {
        return message.channel.send({
            embed: {
                color: config.colors.warning,
                title: "⚠️ Commande en maintenance",
                description: "Cette commande est temporairement indisponible.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }

    // Exécuter la commande
    try {
        await command.run(client, message, args);
    } catch (error) {
        console.error(`❌ Erreur dans la commande ${commandName}:`, error);
        
        const errorEmbed = new Discord.RichEmbed()
            .setColor(config.colors.error)
            .setTitle("❌ Erreur")
            .setDescription("Une erreur inattendue s'est produite lors de l'exécution de cette commande.")
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        message.channel.send(errorEmbed).catch(() => {});
    }
};