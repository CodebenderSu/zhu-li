const { Ping } = require('../data/messages.json');

const ping = (message) => {
  message.channel.send(Ping.Response.Pong);
};

module.exports = ping;
