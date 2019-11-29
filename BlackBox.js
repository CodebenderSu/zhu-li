const { main } = require(`./settings/${process.env.ENV_CONFIG}config.js`);

const { blackBoxChannel } = main;

const blackBox = (message) => {
  if (!blackBoxChannel) return;
  else {
    if (message.channel.name == blackBoxChannel) {
      message.delete();
    } else return;
  };
};

module.exports = blackBox;
