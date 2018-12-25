const { Bravo } = require('../data/messages.json');

const bravo = (message) => {
  message.channel.send(Bravo.Response.Bravo);
}

module.exports = bravo;
