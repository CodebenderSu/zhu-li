const Discord = require('Discord.js');
const { WhoIs, Error } = require('../data/messages.json');

const whoIs = (message) => {
  if (!message.guild) {
    message.author.send(Error.CMDNoAccess);
    return;
  } else {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send(WhoIs.Response.MissingArg);
    const game = member.presence.game;
    const embed = new Discord.RichEmbed()
      .setAuthor(member.user.tag)
      .setColor(member.displayHexColor == '#000000' ? '#99aab5' : member.displayHexColor)
      .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/left-pointing-magnifying-glass_1f50d.png')
      .setImage(member.user.avatarURL)
      .setDescription(`
        **Nickname:** ${member.displayName}
        **Status:** ${member.presence.status}
        **Playing:** ${!game ? 'nothing' : game.name}
        **Is Bot:** ${member.user.bot}
        **Deafened:** ${member.deaf}
        **Muted:** ${member.mute}
        **Voice Channel:** ${!member.voiceChannel ? 'none' : member.voiceChannel.name}

        **Roles:** ${member.roles.map(r => r.name).splice(1).join(', ')}
        **Joined Server:** ${member.joinedAt}
        **Joined Discord:** ${member.user.createdAt}
        `)
        .setFooter(`Inquired by ${message.author.tag}`,
          'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/robot-face_1f916.png')
        .setTimestamp();
    message.channel.send({embed});
  };
};

module.exports = whoIs;
