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
  url: null
};

// Message Embed defaults
const embed = {
  color: '#e9e341',
  footerIconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/robot-face_1f916.png',
  thumbnailWhois: { url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/left-pointing-magnifying-glass_1f50d.png' },
};

module.exports = { locale, main, db, activity, embed };
