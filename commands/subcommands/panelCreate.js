const panelSchema = require('../../schemas/panelSchema');
const { locale } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelCreate = async (interaction) => {
// Setup variables
  const name = interaction.options.getString(commands.panel.sub.create.args.name.name);
  const panels = await panelSchema.find({ guildId: interaction.guildId });
// Check for duplicate panel
  if (panels.find(p => p.name === name)) {
    await interaction.editReply(commands.panel.sub.create.response.duplicate.replace('__name__', name)); return;
  };
// POST to database and respond
  try {
    const res = await panelSchema.create({ guildId: interaction.guildId, name: name });
    await interaction.editReply(commands.panel.sub.create.response.success
      .replace('__name__', name)
      .replace('__command__', `${commands.panel.name} ${commands.panel.sub.add.name}`));
  } catch (err) {
    console.error(err);
    await interaction.editReply(commands.panel.sub.create.response.fail);
  };
};

module.exports = panelCreate;
