const Discord = require("discord.js");
const fetch = require("snekfetch");

module.exports.run = async (client, message, args) => {
    try {
        if (!args[0]) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "Veuillez fournir un terme à rechercher !\n**Usage:** `neige!urban <terme>`",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const term = args.join(' ');
        const response = await fetch.get(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`);
        const data = response.body;

        if (!data.list || data.list.length === 0) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Terme introuvable",
                    description: `Aucune définition trouvée pour \`${term}\``,
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const definition = data.list[0];
        const colors = ['#4285F4', '#2D313C', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'];

        const embed = new Discord.RichEmbed()
            .setColor(colors[Math.floor(Math.random() * colors.length)])
            .setTitle(`📖 Définition de: **${definition.word}**`)
            .setDescription(definition.definition.length > 1024 ? 
                definition.definition.substring(0, 1021) + '...' : 
                definition.definition)
            .addField("👤 Auteur", definition.author, true)
            .addField("👍👎 Votes", `👍 ${definition.thumbs_up} | 👎 ${definition.thumbs_down}`, true)
            .setFooter("NeigeMC | By Neige", message.author.displayAvatarURL)
            .setTimestamp();

        if (definition.example && definition.example.length > 0) {
            const example = definition.example.length > 1024 ? 
                definition.example.substring(0, 1021) + '...' : 
                definition.example;
            embed.addField("💡 Exemple", example, false);
        }

        message.channel.send(embed);

    } catch (error) {
        console.error('Erreur dans la commande urban:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de la recherche dans le dictionnaire urbain.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: "urban",
    description: "Recherche une définition dans le dictionnaire urbain",
    usage: "neige!urban <terme>",
    category: "Utilitaires",
    aliases: ["urbandictionary", "ud"]
};