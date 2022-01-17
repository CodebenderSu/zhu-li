// const { main, infoChapters } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
// const { Info } = require('../settings/messages.json');
//
// const info = (message, args) => {
//   if (!args[0]) {
//     message.channel.send(Info.Response.MissingArg);
//   } else {
//     args.map(i => {
//       const chapter = i.toLowerCase();
//       if (infoChapters[chapter]) {
//       message.channel.send({embed: infoChapters[chapter]});
//       } else {
//       message.channel.send(`${Info.Response.ChapterUnknown}${chapter}`);
//       };
//     });
//   };
// };
//
// module.exports = info;
//
// // Responses from the command seem to be a little asynchronous
