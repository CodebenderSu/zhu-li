const ping = require('./commands/Ping');
const help = require('./commands/Help');
const purge = require('./commands/Purge');
const role = require('./commands/Role');
const doTheThing = require('./commands/DoTheThing');
const bravo = require('./commands/Bravo');
const whoIs = require('./commands/whoIs');
const { Error } = require('./data/messages.json');
//const { OwnerID } = require('./data/config.json');

const commandHandler = (message, command, args) => {
  switch(command) {
    case 'PING': //"!ping"
      ping(message);
      break;
    case 'HELP': //"!help"
      help(message);
      break;
    case 'PURGE': //"!purge n"
      purge(message, args);
      break;
    case 'ROLE': //"!role rolename"
      role(message, args);
      break;
    case 'DOTHETHING': //"!do the thing"
      doTheThing(message);
      break;
    case 'BRAVO': //"!bravo"
      bravo(message);
      break;
    case 'WHOIS': //"!whois @user"
      whoIs(message);
      break;
    default: // Unknown command response
      message.channel.send(Error.UnknownCMD);
  };
};

module.exports = commandHandler;
