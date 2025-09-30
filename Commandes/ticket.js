const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        const categoryId = "689123145973628949";
        const userName = message.author.username;
        const userDiscriminator = message.author.discriminator;
        const channelName = `ticket-${userName.toLowerCase()}-${userDiscriminator}`;

        const existingChannel = message.guild.channels.find(channel => 
            channel.name === channelName && channel.type === 'text'
        );

        if (existingChannel) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Ticket existant",
                    description: `Vous avez déjà un ticket ouvert : ${existingChannel}`,
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const category = message.guild.channels.get(categoryId);
        if (!category) {
            return message.channel.send({
                embed: {
                    color: 0xff0000,
                    title: "❌ Erreur",
                    description: "La catégorie des tickets n'existe pas ! Contactez un administrateur.",
                    footer: { text: "NeigeMC | By Neige" }
                }
            });
        }

        const creatingEmbed = new Discord.RichEmbed()
            .setColor("#ffce00")
            .setTitle("🎫 Création du ticket")
            .setDescription(`Création de votre ticket de support...`)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        const creatingMsg = await message.channel.send(creatingEmbed);

        const ticketChannel = await message.guild.createChannel(channelName, 'text');
        await ticketChannel.setParent(categoryId);

        await ticketChannel.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
            'READ_MESSAGES': false,
            'SEND_MESSAGES': false
        });

        const managementRole = message.guild.roles.find('name', '@management') || 
                              message.guild.roles.find('name', 'Staff') ||
                              message.guild.roles.find('name', 'Modérateur');

        if (managementRole) {
            await ticketChannel.overwritePermissions(managementRole, {
                'VIEW_CHANNEL': true,
                'SEND_MESSAGES': true,
                'READ_MESSAGE_HISTORY': true
            });
        }

        await ticketChannel.overwritePermissions(message.author, {
            'VIEW_CHANNEL': true,
            'SEND_MESSAGES': true,
            'READ_MESSAGE_HISTORY': true,
            'ATTACH_FILES': true,
            'ADD_REACTIONS': true
        });

        const ticketEmbed = new Discord.RichEmbed()
            .setColor("#ffce00")
            .setTitle("🎫 Ticket de support")
            .setDescription(`Bonjour ${message.author.username} !\n\nVotre ticket a été créé avec succès. Veuillez décrire votre problème ou votre question ci-dessous.\n\nUn membre du staff vous répondra dès que possible.`)
            .addField("📋 Instructions", 
                "• Décrivez votre problème de manière claire\n" +
                "• Fournissez des captures d'écran si nécessaire\n" +
                "• Soyez patient, nous vous répondrons rapidement", false)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        await ticketChannel.send(ticketEmbed);
        await ticketChannel.send(`${message.author} ${managementRole ? managementRole : ''}`);

        const successEmbed = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setTitle("✅ Ticket créé")
            .setDescription(`Votre ticket a été créé avec succès : ${ticketChannel}`)
            .setFooter("NeigeMC | By Neige")
            .setTimestamp();

        creatingMsg.edit(successEmbed);

        setTimeout(() => {
            creatingMsg.delete().catch(() => {});
        }, 10000);

    } catch (error) {
        console.error('Erreur dans la commande ticket:', error);
        message.channel.send({
            embed: {
                color: 0xff0000,
                title: "❌ Erreur",
                description: "Une erreur s'est produite lors de la création du ticket.",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
};

module.exports.help = {
    name: "ticket",
    description: "Crée un ticket de support",
    usage: "neige!ticket",
    category: "Utilitaires"
};