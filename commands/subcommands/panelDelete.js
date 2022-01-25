const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const guildSchema = require('../../schemas/guildSchema');
const { locale } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelDelete = async (interaction) => {
// Setup variables
  const data = await guildSchema.find({ id: interaction.guildId });
  const panels = data[0].panels;
// Create dropdown menu
  let options = [];
  panels.forEach(i => options.push({ label: i.name, value: i.name }));
  const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId('panel-delete-select')
        .setPlaceholder(commands.panel.sub.delete.response.select)
        .addOptions(options)
    )
  await interaction.editReply({ content: commands.panel.sub.delete.response.first, components: [row] });
// POST to database
};

module.exports = panelDelete;
