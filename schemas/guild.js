const { Schema } = require('mongoose');

export const guildSchema = new Schema({
  prefix: { type: String, default: '!' },
  ownerID: String,
  blackBoxChannel: [ String ],
  infoChapters: [ ObjectId ]
});
