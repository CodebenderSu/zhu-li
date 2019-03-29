const { Ping } = require('../settings/messages.json');

const ping = (message) => {
  message.channel.send(Ping.Response.Pong);
};

module.exports = ping;
