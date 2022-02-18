const { connect } = require('mongoose');

const { locale, db: { mongooseURI }, activity } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { app, db } = require(`../lang/${locale}.json`);

const handleReady = async (client) => {
/////////////////////////* MONGODB HOOK *//////////////////////
  try {
    console.log(db.pending);
    await connect(mongooseURI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(db.success);
  } catch (err) {
    console.error(db.fail, err);
  };
///////////////////////* BOT READY *//////////////////////////
  console.log(app.ready.replace('__u__', client.user.tag).replace('__n__', client.guilds.cache.size));
  try {
    client.user.setActivity({
      type: activity.type,
      name: activity.status,
      url: activity.url
    });
  } catch (err) {
    console.error(app.activityFail, err);
  };
};

module.exports = handleReady;
