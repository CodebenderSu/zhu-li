const { Error, Purge } = require('../data/messages.json');

const purge = (message, args) => {
  const count = args[0]
  if (!message.guild) {
    message.author.send(Error.CMDNoAccess);
    return;
  } else if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
    message.channel.send(Error.BotNoPerm);
    return;
  } else if (!message.member.hasPermission('MANAGE_MESSAGES')) {
    message.channel.send(Error.UserNoPerm);
    return;
  } else {
    if (parseInt(count)) {
      message.channel.bulkDelete(count);
      return;
    } else {
      message.channel.send(`${Purge.Response.CannotPurgeA} "${args.join(' ')}" ${Purge.Response.CannotPurgeB}`);
      return;
    };
  };
};

module.exports = purge;
