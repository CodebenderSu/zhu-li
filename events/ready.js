const { locale, activity } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { app } = require(`../lang/${locale}.json`);

const handleReady = (client) => {
  console.log(app.ready.replace('__u__', client.user.tag));
  client.user.setActivity({
    type: activity.type,
    name: activity.status,
    url: activity.url
  });
};

module.exports = handleReady;
