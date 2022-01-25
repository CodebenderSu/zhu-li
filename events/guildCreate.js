const { connect } = require('mongoose');

const guildSchema = require('../schemas/guildSchema');
const { locale, db: { mongooseURI }, activity } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { app } = require(`../lang/${locale}.json`);

const handleGuildCreate = async (guild, client) => {
  const defaultGuildSchema = {
    id: guild.id,
    panels: []
  };
  await new guildSchema(defaultGuildSchema).save()
};

module.exports = handleGuildCreate;
