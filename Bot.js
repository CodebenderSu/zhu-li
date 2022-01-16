require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Intents, Collection } = require('discord.js');
const { connect } = require('mongoose');

const Guild = require('./schemas/Guild');
const handleReady = require('./events/ready');
const handleInteraction = require('./events/interaction');
// const handleMessage = require('./events/message');
const { main: { token, mongooseURI } } = require(`./settings/${process.env.ENV_CONFIG}config.js`);

/////////////////////* BOT INITIALIZATION *///////////////////////
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const dirPath = path.resolve(__dirname, './commands');
const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
};
/////////////////////////* MONGODB HOOK *///////////////////////////////
// connect(mongooseURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// }).then(console.log('Connected to MongoDB successfully'))
/////////////////////////* BOT LOGIN */////////////////////////////
client.login(token)
  .then(console.log('Getting you plugged in...'))
  .catch(console.error);
////////////////////* EVENTS HANDLES */////////////////////////////
client.once('ready', () => handleReady(client));
client.on('interactionCreate', (interaction) => handleInteraction(interaction, client));
// client.on('message', (message) => handleMessage(message, client));

client.on("error", (e) => console.error('[Error]', e.message));
client.on("warn", (e) => console.warn('[Warning]', e.message));
//client.on("debug", (e) => console.info('[Debug]', e.message));


///////////////////////////* SERVER PURGE *////////////////////////
//let guildList = client.guilds.map(guild => guild.name).join('\n');
//console.warn(`About to leave ${client.guilds.length} servers!`);
//client.guilds.map(guild => guild.leave());
//console.warn(`Left all servers`)
