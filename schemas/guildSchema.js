const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
  id: { type: String, required: true },
  panels: [{
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    messageId: { type: String, default: null },
    roles: [{
      name: { type: String, required: true },
      id: { type: String, required: true },
      alias: String,
      color: { type: String, default: null }
    }],
  }],
  // prefix: { type: String, default: '!' },
  // ownerID: String,
  // blackBoxChannel: [ String ],
  // infoChapters: [ Schema.Types.ObjectId ]
});

module.exports = model('guild', guildSchema);
