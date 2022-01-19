const Discord = require('Discord.js');

// A locale indicator, should match the name of a ../lang/ file
const locale = 'en';
// You need to create an app via the Discord Developer panel
// https://discord.com/developers/applications
const main = {
  token: '', // App secret
  clientId: '', // App ID
  ownerId: '' // App owner ID, can be gleaned with /inspect command
};
// Details for connecting to MongoDB
const db = {
  mongooseURI: ''
};
// Activity status for bot
const activity = {
  type: 'WATCHING', // Must be valid one of https://discord.js.org/#/docs/discord.js/v13/typedef/ActivityType
  status: 'the entire Avatar series',
  url: ''
};
// Message Embed defaults
const embed = {
  color: '#e9e341'
};

module.exports = { locale, main, db, activity, embed };
