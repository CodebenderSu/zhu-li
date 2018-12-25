const { DoTheThing } = require('../data/messages.json');

const doTheThing = (message) => {
  const roll = Math.floor((Math.random() * 6) + 1);
  switch(roll) {
    case 1:
      message.channel.send(DoTheThing.Response.ThingA);
      break;
    case 2:
      message.channel.send(DoTheThing.Response.ThingB);
      break;
    case 3:
      message.channel.send(DoTheThing.Response.ThingC);
      break;
    case 4:
      message.channel.send(DoTheThing.Response.ThingD);
      break;
    case 5:
      message.channel.send(DoTheThing.Response.ThingE);
      break;
    case 6:
      message.channel.send(DoTheThing.Response.ThingF);
      break;
  };
};

module.exports = doTheThing;
