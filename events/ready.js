const { connect } = require('mongoose');

const { locale, db: { mongooseURI }, activity } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { app, errors } = require(`../lang/${locale}.json`);

const handleReady = async (client) => {
/////////////////////////* MONGODB HOOK *//////////////////////
  try {
    await connect(mongooseURI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(app.dbConnected);
  } catch (err) {
    console.error(errors.dbFail, err);
  };
///////////////////////* BOT READY *//////////////////////////
  console.log(app.ready.replace('__u__', client.user.tag));
  try {
    client.user.setActivity({
      type: activity.type,
      name: activity.status,
      url: activity.url
    });
  } catch (err) {
    console.error(errors.activityFail, err);
  };
};

module.exports = handleReady;
