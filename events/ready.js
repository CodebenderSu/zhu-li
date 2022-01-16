const handleReady = (client) => {
  console.log(`Logged in as: ${client.user.tag}`);
  client.user.setActivity({ type: 'WATCHING', name: 'you, mate'});
};

module.exports = handleReady;
