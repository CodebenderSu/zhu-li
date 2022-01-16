const { main } = require(`../settings/${process.env.ENV_CONFIG}config.js`);

const { blackBoxID } = main;

const blackBox = (message) => {
  if (!blackBoxID) return;
  else {
    if (message.channel.id == blackBoxID) {
      message.delete();
    } else return;
  };
};

module.exports = blackBox;
