const Discord = require('Discord.js');

// A locale indicator, should match the name of a ../lang/ file
const locale = 'en';

// You need to create an app via the Discord Developer panel
// https://discord.com/developers/applications
const main = {
  token: '', // App secret
  clientId: '', // App ID
  ownerId: '', // App owner ID, can be gleaned with /inspect command
  ownerGuild: '' // Guild ID to deploy commands to for testing (Developer only)
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

// Link to End User documentation from the README.md
const userDocs = 'https://github.com/CodebenderSu/Zhu-Li#end-user-command-guide';

// Message Embed defaults
const embed = {
  color: '#e9e341',
  footerIconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/robot-face_1f916.png',
  thumbnailWhois: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/left-pointing-magnifying-glass_1f50d.png',
  thumbnailRoll: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/game-die_1f3b2.png'
};

// These should match with the valid strings defined by Discord.js documentation
// See: https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable
const validColorStr = [
  'DEFAULT',
  'WHITE',
  'AQUA',
  'GREEN',
  'BLUE',
  'YELLOW',
  'PURPLE',
  'LUMINOUS_VIVID_PINK',
  'FUCHSIA',
  'GOLD',
  'ORANGE',
  'RED',
  'GREY',
  'NAVY',
  'DARK_AQUA',
  'DARK_GREEN',
  'DARK_BLUE',
  'DARK_PURPLE',
  'DARK_VIVID_PINK',
  'DARK_GOLD',
  'DARK_ORANGE',
  'DARK_RED',
  'DARK_GREY',
  'DARKER_GREY',
  'LIGHT_GREY',
  'DARK_NAVY',
  'BLURPLE',
  'GREYPLE',
  'DARK_BUT_NOT_BLACK',
  'NOT_QUITE_BLACK',
  'RANDOM'
];

module.exports = { locale, main, db, activity, userDocs, embed, validColorStr };
