const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const guildSchema = require('../../schemas/guildSchema');
const { locale } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelRemove = async (interaction) => {
// Setup variables
  const role = interaction.options.getRole(commands.panel.sub.remove.args.role.name);
  const data = await guildSchema.find({ id: interaction.guildId });
  const panels = data[0].panels;
// Create dropdown menu
  // something
// POST to database
  await interaction.editReply('remove');
};

module.exports = panelRemove;
