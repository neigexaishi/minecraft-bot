const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config');

const client = new Discord.Client();

// Collection pour stocker les commandes
client.commands = new Discord.Collection();

// Chargement des commandes
fs.readdir("./Commandes/", (error, files) => {
    if (error) {
        console.error('Erreur lors du chargement des commandes:', error);
        return;
    }

    const commandFiles = files.filter(file => file.endsWith('.js'));
    if (commandFiles.length === 0) {
        console.log('Aucune commande trouvée !');
        return;
    }

    commandFiles.forEach(file => {
        try {
            const command = require(`./Commandes/${file}`);
            if (command.help && command.help.name) {
                client.commands.set(command.help.name, command);
                console.log(`✅ Commande chargée: ${command.help.name}`);
            } else {
                console.log(`⚠️ Commande invalide: ${file}`);
            }
        } catch (error) {
            console.error(`❌ Erreur lors du chargement de ${file}:`, error.message);
        }
    });

    console.log(`📚 ${client.commands.size} commandes chargées avec succès !`);
});

// Chargement des événements
fs.readdir("./Events/", (error, files) => {
    if (error) {
        console.error('Erreur lors du chargement des événements:', error);
        return;
    }

    const eventFiles = files.filter(file => file.endsWith('.js'));
    console.log(`📡 Chargement de ${eventFiles.length} événements...`);

    eventFiles.forEach(file => {
        try {
            const event = require(`./Events/${file}`);
            const eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client));
            console.log(`✅ Événement chargé: ${eventName}`);
        } catch (error) {
            console.error(`❌ Erreur lors du chargement de ${file}:`, error.message);
        }
    });
});

// Événement de connexion
client.on('ready', () => {
    console.log(`🤖 ${client.user.tag} est maintenant en ligne !`);
    console.log(`📊 Serveurs: ${client.guilds.size} | Utilisateurs: ${client.users.size}`);
    
    // Statut du bot
    client.user.setStatus('online');
    client.user.setPresence({
        game: {
            name: `${config.bot.prefix}help - ${client.guilds.size} serveurs`,
            type: "WATCHING"
        }
    });

    // Mise à jour du statut toutes les 30 minutes
    setInterval(() => {
        client.user.setPresence({
            game: {
                name: `${config.bot.prefix}help - ${client.guilds.size} serveurs`,
                type: "WATCHING"
            }
        });
    }, 1800000);
});

// Gestion des erreurs
client.on('error', error => {
    console.error('❌ Erreur Discord.js:', error);
});

client.on('warn', warning => {
    console.warn('⚠️ Avertissement Discord.js:', warning);
});

process.on('unhandledRejection', error => {
    console.error('❌ Erreur non gérée:', error);
});

process.on('uncaughtException', error => {
    console.error('❌ Exception non capturée:', error);
    process.exit(1);
});

// Mots interdits
const bannedWords = [
    "fdp", "enculé", "encule", "pute", "salope", "ntm", "nique", 
    "tg", "batard", "bztmr", "connard", "con", "merde", "putain"
];

// Filtre de langage
client.on('message', message => {
    if (message.author.bot || !message.guild) return;
    
    const content = message.content.toLowerCase();
    const hasBannedWord = bannedWords.some(word => 
        content.includes(word.toLowerCase())
    );
    
    if (hasBannedWord) {
        message.delete().catch(() => {});
        message.channel.send({
            embed: {
                color: config.colors.warning,
                title: "⚠️ Attention",
                description: `${message.author}, attention à votre langage !`,
                footer: { text: "NeigeMC | By Neige" }
            }
        }).then(msg => msg.delete(5000));
    }
});

// Commandes spéciales
client.on('message', message => {
    if (message.author.bot || !message.guild) return;
    
    // Commande IP
    if (message.content === `${config.bot.prefix}ip`) {
        message.channel.send({
            embed: {
                color: config.colors.info,
                title: "🌐 Informations du serveur",
                description: "**IP du serveur Minecraft:**\n`play.neigemc.com`\n\n**Site web:**\n`http.neigemc.com`",
                footer: { text: "NeigeMC | By Neige" }
            }
        });
    }
    
    // Commande de salutation
    if (message.content.toLowerCase() === 'bonjour') {
        message.reply('Salut ! 👋');
    }
});

// Connexion du bot
if (!config.bot.token) {
    console.error('❌ Token Discord manquant ! Veuillez le configurer dans config.js');
    process.exit(1);
}

client.login(config.bot.token).catch(error => {
    console.error('❌ Erreur de connexion:', error.message);
    process.exit(1);
}); 

