require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Intents, Collection } = require('discord.js');

const handleReady = require('./events/ready');
const handleInteraction = require('./events/interaction');
const handleGuildDelete = require('./events/guildDelete');
const handleUnhandledRejection = require('./events/unhandledRejection');
const { locale, main: { token } } = require(`./settings/${process.env.ENV_CONFIG}config.js`);
const { app } = require(`./lang/${locale}.json`);

/////////////////////* BOT INITIALIZATION *///////////////////////
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS
	]
});

client.commands = new Collection();
const dirPath = path.resolve(__dirname, './commands');
const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
};
/////////////////////////* BOT LOGIN */////////////////////////////
client.login(token)
  .then(console.log(app.start))
  .catch(err => console.error(app.fail, err));
////////////////////* EVENTS HANDLES */////////////////////////////
client.once('ready', () => handleReady(client));
client.on('interactionCreate', (interaction) => handleInteraction(interaction, client));
client.on('guildDelete', (guild) => handleGuildDelete(guild, client));
client.on('unhandledRejection', (err) => handleUnhandledRejection(err));
client.on("error", (e) => console.error('[Error]', e.message));
client.on("warn", (e) => console.warn('[Warning]', e.message));

module.exports = { client };
///////////////////////////* SERVER PURGE *////////////////////////
//let guildList = client.guilds.map(guild => guild.name).join('\n');
//console.warn(`About to leave ${client.guilds.length} servers!`);
//client.guilds.map(guild => guild.leave());
//console.warn(`Left all servers`)
