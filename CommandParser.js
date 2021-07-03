const commandHandler = require('./CommandHandler')
const { main } = require(`./settings/${process.env.ENV_CONFIG}config.js`);

const commandParser = (message, rawCommand) => {
  const args = rawCommand.toUpperCase().trim().split(/ +/g);
  const command = args.shift();
  
//  const author = `${message.author.username}#${message.author.discriminator}`;
//  console.log(`${author} used command: ${command} ${args}`);

  commandHandler(message, command, args);
};

module.exports = commandParser;
