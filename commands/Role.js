const { Role } = require('../data/messages.json');

const role = (message, command) => {
  const roles = message.member.roles.map(r => r.id).splice(1).join(', ');
  message.channel.send(roles);
  // let reqRank = command.slice(5);
  // let rank = message.guild.roles.find(r => r.name === reqRank);
  // if (rank) {
  //   console.log(reqRank, rank);
  //   message.member.addRole(rank);
  //   message.channel.send(`${rank} ${Role.Response.RoleAdd}`);
  //   return;
  // } else {
  //   console.log(reqRank, rank);
  //   message.channel.send(`${Role.Response.RoleDNE}`);
  //   return;
  // };
};

module.exports = role;


// update roles database
// check for existence of requested role
// check to see if user already has role
// toggle role for user
