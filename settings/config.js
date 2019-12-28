const Discord = require('Discord.js');

const main = {
  token: '',
  prefix: '!',
  ownerID: '',
  blackBoxChannel: ''
};

const infoChapters = {
  example: new Discord.RichEmbed()
    .setColor('#e9e341')
    .setAuthor('Example Info Chapter')
    .setDescription(`
      This is an example of the \`${main.prefix}info\` command. You can pass different arguments to access different chapters.\n
      To create or edit chapters, please use my "config.js" file and use a valid embed format outlined in Discord.js documentation.\n
      Please see [here](https://discord.js.org/#/docs/main/stable/class/RichEmbed) or [here](https://anidiots.guide/first-bot/using-embeds-in-messages) for more details
      `)
    .setTimestamp(),
  blackbox: new Discord.RichEmbed()
    .setColor('000000')
    .setAuthor('The Black Box')
    .setDescription(`
      This channel can be used to rant. Any messages will be deleted automatically.
    `)
    .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/milky-way_1f30c.png')
};

module.exports = { main, infoChapters };
