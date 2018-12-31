const Discord = require('discord.js');
const commandParser = require('./CommandParser');
const blackBox = require('./BlackBox');
const { Token, Prefix } = require('./data/config.json');

/////////////////////* BOT INITIALIZATION *///////////////////////
const client = new Discord.Client();

client.login(Token)
  .then(console.log('Getting you plugged in...'))
  .catch(console.error);
client.on('ready', () => {
  console.log(`Logged in as: ${client.user.tag}`);
});
/////////////////////* COMMAND LISTENER *//////////////////////////
client.on('message', (message) => {
  blackBox(message);
  // Check message first for prefix or mention, then parse command
  if (!message.content.startsWith(Prefix) || message.author.bot) {
    if (!message.content.startsWith(client.user) || message.author.bot) return;
    else if (message.content.startsWith(client.user)) {
      let rawCommand = message.content.slice((`${client.user}`).length + 1);
      commandParser(message, rawCommand);
    };
  } else if (message.content.startsWith(Prefix)) {
    let rawCommand = message.content.slice(Prefix.length);
    commandParser(message, rawCommand);
  };
});
//////////////////////* ERROR HANDLERS */////////////////////////
client.on("error", (e) => console.error('[Error]', e.message));
client.on("warn", (e) => console.warn('[Warning]', e.message));
//client.on("debug", (e) => console.info('[Debug]', e.message));

///////////////////////////* SERVER PURGE *////////////////////////
//let guildList = client.guilds.map(guild => guild.name).join('\n');
//console.log(`Servers: \n${guildList}`);
//client.guilds.map(guild => guild.leave());
