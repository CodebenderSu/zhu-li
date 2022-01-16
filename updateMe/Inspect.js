const Discord = require('Discord.js');

const { main } = require(`../settings/${process.env.ENV_CONFIG}config.js`);

const inspect = (message) => {
  const { guild, member, channel, author } = message;
  const bans = guild.fetchBans().catch('null');
  const invites = guild.fetchInvites().catch('null');
  const embed = new Discord.MessageEmbed()
    .setAuthor(`Server Diagnostic`)
    .setColor(member ? member.displayHexColor == '#000000' ? '#e9e341' : member.displayHexColor : '#e9e341')
    .setThumbnail(guild.iconURL)
    .setFooter(`Responding to ${author.tag}`,
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/robot-face_1f916.png')
    .setTimestamp()
    .setDescription(`
      **Server Name:** ${guild.name}
      **Server ID:** \`${guild.id}\`
      **Server DOB:** ${guild.createdAt}
      **Server Region:** ${guild.region}

      **Channel Count:** ${Array.from(guild.channels.values()).length}
      **Role Count:** ${Array.from(guild.roles.values()).length}
      **Member Count:** ${guild.memberCount}
      **Bans Count:** ${!bans || !bans.size ? '0' : bans.size}
      **Invites Count:** ${!invites || !invites.size ? '0' : invites.size}

      **Server Owner:** ${guild.owner}
      **Owner ID:** \`${guild.ownerID}\`

      **Channel Name:** ${channel.name}
      **Channel ID:** \`${channel.id}\`
      **Channel Type:** ${channel.type}
      `)
  message.channel.send({embed});
};

module.exports = inspect;
