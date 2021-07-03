const Discord = require('Discord.js');
const { WhoIs, Error } = require('../settings/messages.json');

const whoIs = (message) => {
  if (!message.guild) {
    message.author.send(Error.CMDNoAccess);
    return;
  } else {
    const member = message.mentions.members.first();
    console.log(message.mentions.members)
    if (!member) return message.channel.send(WhoIs.Response.MissingArg);
    const { presence: { game}, user } = member;
    const embed = new Discord.RichEmbed()
      .setAuthor(user.tag)
      .setColor(member.displayHexColor == '#000000' ? '#99aab5' : member.displayHexColor)
      .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/left-pointing-magnifying-glass_1f50d.png')
      .setImage(user.avatarURL)
      .setDescription(`
        **Nickname:** ${member.displayName}
        **Presence:** ${member.presence.status}
        **Status:** ${!game ? 'N/A' : game.name}
        **Is Bot:** ${user.bot}
        **Deafened:** ${member.deaf}
        **Muted:** ${member.mute}
        **Voice Channel:** ${!member.voiceChannel ? 'none' : member.voiceChannel.name}

        **Roles:** ${member.roles.map(r => r.name).splice(1).join(', ')}
        **Joined Server:** ${member.joinedAt}
        **Joined Discord:** ${user.createdAt}
        **Last Seen:** ${!user.lastMessage ? 'N/A' : user.lastMessage.createdAt}
        `)
        .setFooter(`Inquired by ${message.author.tag}`,
          'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/robot-face_1f916.png')
        .setTimestamp();
    message.channel.send({embed});
  };
};

module.exports = whoIs;
