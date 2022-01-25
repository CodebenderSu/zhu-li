const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const guildSchema = require('../../schemas/guildSchema');
const { locale } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelAdd = async (interaction) => {
// Setup variables
  const role = interaction.options.getRole(commands.panel.sub.add.args.role.name);
  const alias = interaction.options.getString(commands.panel.sub.add.args.alias.name);
  const color = interaction.options.getString(commands.panel.sub.add.args.color.name);
  const data = await guildSchema.find({ id: interaction.guildId });
  const panels = data[0].panels;
// Create dropdown menu
  // something
// POST to database
  // something
  await interaction.editReply('add');
};

module.exports = panelAdd;
