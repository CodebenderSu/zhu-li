const { Schema, model } = require('mongoose');

const Guild = new Schema({
  prefix: { type: String, default: '!' },
  ownerID: String,
  blackBoxChannel: [ String ],
  infoChapters: [ Schema.Types.ObjectId ]
});

module.exports = model('Guild', Guild);
