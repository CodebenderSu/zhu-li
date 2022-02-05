const { Schema, model } = require('mongoose');

const panelSchema = new Schema({
  guildId: { type: String, required: true },
  name: { type: String, required: true },
  messageId: { type: String, default: null },
  roles: [{
    name: { type: String, required: true },
    roleId: { type: String, required: true },
    alias: String
  }]
});

module.exports = model('panel', panelSchema);
