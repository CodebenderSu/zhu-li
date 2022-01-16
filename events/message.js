const commandParser = require('../utils/commandParser');
const blackBox = require('../utils/blackBox');

const handleMessage = (message, client) => {
  blackBox(message);
  // Check message first for prefix or mention, then parse command
  if (!message.content.startsWith(client.prefix) || message.author.bot) {
    if (!message.content.startsWith(client.user) || message.author.bot) return;
    else if (message.content.startsWith(client.user)) {
      let rawCommand = message.content.slice((`${client.user}`).length + 1);
      commandParser(message, rawCommand);
    };
  } else if (message.content.startsWith(client.prefix)) {
    let rawCommand = message.content.slice(client.prefix.length);
    commandParser(message, rawCommand);
  };
};

module.exports = handleMessage;
