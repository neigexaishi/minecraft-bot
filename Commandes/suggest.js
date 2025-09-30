const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        if (!args[0]) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez fournir une suggestion !\n**Usage:** `neige!suggest <votre suggestion>`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const suggestion = args.join(' ');
        if (suggestion.length > 1000) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Votre suggestion est trop longue ! (Maximum 1000 caractères)",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const pollEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`**Suggestion:** ${suggestion}`)
            .setColor("#ffce00")
            .setFooter('Appuyez sur les réactions ci-dessous pour voter')
            .setTimestamp();

        const msg = await message.channel.send(pollEmbed);
        await msg.react('✅');
        await msg.react('❌');
        
        message.delete().catch(() => {});
    } catch (error) {
        console.error('Erreur dans la commande suggest:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de la création du sondage.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: "suggest",
    description: "Créer un sondage pour une suggestion",
    usage: "neige!suggest <votre suggestion>",
    category: "Utilitaires"
};