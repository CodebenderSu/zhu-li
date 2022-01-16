const { main } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { Prune, Error } = require('../settings/messages.json');

const prune = (message, args) => {
  const { Response: { MissingArg, InvalidArg, PruneSuccessA, PruneSuccessB }} = Prune;
  if (!args[0]) {
    message.channel.send(MissingArg);
  } else {
    const days = parseInt(args[0]);
    console.log(typeof days)
    if (typeof days !== 'number' || days <= 0 || days > 30 || isNaN(days)) {
      message.channel.send(InvalidArg);
    } else {
      message.guild.pruneMembers(days)
        .then(pruned => {
          message.channel.send(`${PruneSuccessA}${pruned}${PruneSuccessB}`);
        })
        .catch(err => {
          message.channel.send(`${Error.CMDFailed}\n${err}`)
        });
    };
  };
};

module.exports = prune;
