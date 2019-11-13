const { main, infoChapters } = require('../settings/config.js');
const { Info } = require('../settings/messages.json');

const info = (message, args) => {
  if (!args[0]) {
    message.channel.send(Info.Response.MissingArg);
  } else {
    const chapter = args[0].toLowerCase();
    if (infoChapters[chapter]) {
    message.channel.send({embed: infoChapters[chapter]});
    } else {
    message.channel.send(Info.Response.ChapterUnknown);
    };
  };
};

module.exports = info;
