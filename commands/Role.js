const { Role } = require('../data/messages.json');

const role = (message, command) => {
  let reqRank = command.slice(5);
  let rank = message.guild.roles.find(r => r.name === reqRank);
  if (rank) {
    console.log(reqRank, rank);
    message.member.addRole(rank);
    message.channel.send(`${rank} ${Role.Response.RoleAdd}`);
    return;
  } else {
    console.log(reqRank, rank);
    message.channel.send(`${Role.Response.RoleDNE}`);
    return;
  };
};

module.exports = role;
