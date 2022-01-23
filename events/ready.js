const { connect } = require('mongoose');

const { locale, db: { mongooseURI }, activity } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { app } = require(`../lang/${locale}.json`);

const handleReady = async (client) => {
/////////////////////////* MONGODB HOOK *//////////////////////
  await connect(mongooseURI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(console.log('Connected to MongoDB successfully'))
///////////////////////* BOT READY *//////////////////////////
  console.log(app.ready.replace('__u__', client.user.tag));
  client.user.setActivity({
    type: activity.type,
    name: activity.status,
    url: activity.url
  });
};

module.exports = handleReady;
