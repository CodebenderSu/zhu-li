const commandHandler = require('./CommandHandler')
const { OwnerID } = require('./data/config.json');
const { Error, Ping, Bravo } = require('./data/messages.json');

const commandParser = (message, rawCommand) => {
  const args = rawCommand.toUpperCase().trim().split(/ +/g);
  const command = args.shift();
//  const author = `${message.author.username}#${message.author.discriminator}`;
//  console.log(`${author} used command: ${command} ${args}`);
  commandHandler(message, command, args);
};

module.exports = commandParser;
