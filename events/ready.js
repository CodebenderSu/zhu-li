const handleReady = (client) => {
  console.log(`Logged in as: ${client.user.tag}`);
  client.user.setActivity({ type: 'WATCHING', name: 'the entire Avatar series'});
};

module.exports = handleReady;
