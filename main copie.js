const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require("/Users/dimitrihamelin/Desktop/bot/config.json");

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
];

const client = new Client({ intents });

const PREFIX = '/';
const langMap = {
    [config["cmd-bot"]]: "en",
    [config["cmd-bot2"]]: "de",
    [config["cmd-bot3"]]: "fr",
    [config["cmd-bot4"]]: "fr",
};

const helpEmbeds = {
    en: new MessageEmbed({
        title: "List of commands",
        color: "#ff0000",
        fields: [
            { name: ":small_orange_diamond: Staff", value: "`/clear (number of messages)` - Clear messages in the channel (reserved for administrators and moderators)", inline: false },
            { name: ":small_orange_diamond: Members", value: "`/help` - Display the list of commands.", inline: false }
        ],
        timestamp: new Date()
    }),

    de: new MessageEmbed({
        title: "Liste der Befehle",
        color: "#ff0000",
        fields: [
            { name: ":small_orange_diamond: Personal", value: "`/clear (Anzahl der Nachrichten)` - Löscht Nachrichten im Kanal (reserviert für Administratoren und Moderatoren)", inline: false },
            { name: ":small_orange_diamond: Mitglieder", value: "`/help` - Zeigt die Liste der Befehle an.", inline: false }
        ],
        timestamp: new Date()
    }),

    fr: new MessageEmbed({
        title: "Liste des commandes",
        color: "#ff0000",
        fields: [
            { name: ":small_orange_diamond: Staff", value: "`/clear (nombre de messages)` - Efface les messages du salon (réservé aux administrateurs et aux modérateurs)", inline: false },
            { name: ":small_orange_diamond: Membres", value: "`/help` - Affiche l'aide des commandes.", inline: false }
        ],
        timestamp: new Date()
    }),
};

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'help' && [config["cmd-bot"], config["cmd-bot2"], config["cmd-bot3"], config["cmd-bot4"]].includes(message.channel.id)) {
        const lang = langMap[message.channel.id] || "fr";
        const helpEmbed = helpEmbeds[lang];

        message.reply({ embeds: [helpEmbed], ephemeral: true })
            .then(msg => { helpMessage = msg; })
            .catch(console.error);
    }
});

client.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.get(config.welcome);

    if (welcomeChannel) {
        welcomeChannel.send(`Hello, welcome on Locarodix, ${member}!`);
    } else {
        console.log("Impossible de trouver le salon de bienvenue dans le cache.");
    }
});

client.on("ready", () => {
    console.log("Bot ON");
    console.log(`Connecté en tant que ${client.user.tag}`);

    const logsChannel = client.channels.cache.get(config.logs);

    if (logsChannel) {
        logsChannel.send("Bot en ligne");
    } else {
        console.log("Impossible de trouver le salon de logs dans le cache.");
    }

    // sendContactMessages(); // La fonction sendContactMessages() n'est pas définie dans le code fourni.

    // Autres actions d'initialisation...
});

client.login(config.token);

const CLEAR_MESSAGES = '!clearMessages';

