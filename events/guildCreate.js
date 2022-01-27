const { connect } = require('mongoose');

const { locale, db: { mongooseURI }, activity } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { app } = require(`../lang/${locale}.json`);

const handleGuildCreate = async (guild, client) => {

};

module.exports = handleGuildCreate;
