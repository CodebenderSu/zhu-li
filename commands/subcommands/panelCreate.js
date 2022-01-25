const guildSchema = require('../../schemas/guildSchema');
const { locale } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelCreate = async (interaction) => {
// Setup variables
  const name = interaction.options.getString(commands.panel.sub.create.args.name.name);
  const data = await guildSchema.find({ id: interaction.guildId });
  const panels = data[0].panels;
// Check for duplicate panel
  if (panels.find(i => i.name === name)) {
    await interaction.editReply(commands.panel.sub.create.response.duplicate.replace('__name__', name)); return;
  };
// POST to database and respond
  try {
    const res = await guildSchema.updateOne({ id: interaction.guildId }, { panels: [ ...panels, { name: name }] });
    await interaction.editReply(commands.panel.sub.create.response.success
      .replace('__name__', name)
      .replace('__command__', `${commands.panel.name} ${commands.panel.sub.add.name}`));
  } catch (err) {
    console.error(err);
    await interaction.editReply(commands.panel.sub.create.response.fail);
  };
};

module.exports = panelCreate;
