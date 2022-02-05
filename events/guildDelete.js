const panelSchema = require('../schemas/panelSchema');
const { locale, db: { mongooseURI }, activity } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { app, db } = require(`../lang/${locale}.json`);

const handleGuildDelete = async (guild, client) => {
  console.info(db.kicked.replace('__id__', guild.id))
  try {
    await panelSchema.deleteMany({ guildId: guild.id });
    console.info(db.deleteSuccess.replace('__id__', guild.id));
  } catch (err) {
    console.error(db.deleteFail.replace('__id__', guild.id), err);
  };
};

module.exports = handleGuildDelete;
