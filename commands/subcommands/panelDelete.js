const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const panelSchema = require('../../schemas/panelSchema');
const { locale } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelDelete = async (interaction) => {
// Setup variables
  const panels = await panelSchema.find({ guildId: interaction.guildId });
// Create dropdown menu
  let options = [];
  panels.forEach(p => options.push({ label: p.name, value: p.name }));
  const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId('panel-delete-select')
        .setPlaceholder(commands.panel.sub.delete.response.placeholder)
        .addOptions(options)
    )
  const filter = i => (i.customId === 'panel-delete-select') && i.user.id === interaction.user.id;
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 });
// Initial response
  await interaction.editReply({ content: commands.panel.sub.delete.response.select, components: [row] });
// Handle selection
  collector.on('collect', async i => {
    try {
      const name = i.values[0];
      const res = await panelSchema.deleteOne({ guildId: interaction.guildId, name: name });
      await interaction.editReply({ content: commands.panel.sub.delete.response.success.replace('__name__', name), components: [] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ content: commands.panel.sub.delete.response.fail, components: [] });
    };
  })
  // Cancel command on timeout
  collector.on('end', async collected => {
    if (collected.map(c => c).length === 0) {
      await interaction.editReply({ content: commands.panel.sub.delete.response.cancel, components: [] });
    };
    return;
  });
};

module.exports = panelDelete;
