const Discord = require('Discord.js');

const ref = require('../settings/messages.json');
const { main } = require(`../settings/${process.env.ENV_CONFIG}config.js`);

const { prefix } = main;

const helpBuilder = () => { // Builds the string to be returned
  let helpStr = ``; // Initiate String
  for (let cmd in ref) {
    const name = ref[cmd]['Name'];
    const desc = ref[cmd]['Desc'];
    const args = ref[cmd]['Args'];
    if (cmd == 'Error') helpStr = helpStr; // Ignore "Error"
    else if (args) {
      helpStr = helpStr.concat(`\`${prefix}${name} ${args}\` - ${desc}\n`);
    } else {
      helpStr = helpStr.concat(`\`${prefix}${name}\` - ${desc}\n`);
    };
  };
  return(helpStr); // Compiled String
};

const help = (message) => {
  const embed = new Discord.RichEmbed()
    .setColor('#e9e341')
    .setDescription(`Hello **${message.author.username}**, below are commands \
      you may use to tell me what to do. All commands start with \"**${prefix}**\"; \
      alternatively you may also @ mention me.`)
    .setFooter(`Responding to ${message.author.tag}`,
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/robot-face_1f916.png')
    .setTimestamp()
    .addField('Command Reference', helpBuilder());
  message.channel.send({embed});
};

module.exports = help;
