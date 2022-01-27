const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const panelSchema = require('../../schemas/panelSchema');
const { locale } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelRemove = async (interaction) => {
// Setup variables
  const role = interaction.options.getRole(commands.panel.sub.remove.args.role.name);
  const panels = await panelSchema.find({ guildId: interaction.guildId });
// Create dropdown menu
  let options = [];
  panels.forEach(p => options.push({ label: p.name, value: p.name }));
  const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId('panel-remove-select')
        .setPlaceholder(commands.panel.sub.remove.response.placeholder)
        .addOptions(options)
    )
  const filter = i => (i.customId === 'panel-remove-select') && i.user.id === interaction.user.id;
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 });
// Initial response
  await interaction.editReply({ content: commands.panel.sub.remove.response.select, components: [row] });
// Handle selection
  collector.on('collect', async i => {
    const name = i.values[0];
    const panel = await panelSchema.findOne({ guildId: interaction.guildId, name: name });
    // Check for role
    if (!panel.roles.find(r => r.roleId === role.id)) {
      await interaction.editReply({ content: commands.panel.sub.remove.response.noRole.replace('__role__', role.name).replace('__name__', name), components: [] });
      return;
    };
    // Update DB
    try {
      const res = await panelSchema.updateOne({ guildId: interaction.guildId, name: name }, { $pull: { roles: { roleId: role.id }}});
      await interaction.editReply({ content: commands.panel.sub.remove.response.success.replace('__role__', role.name).replace('__name__', name), components: [] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ content: commands.panel.sub.remove.response.fail, components: [] });
    };
  })
  // Cancel command on timeout
  collector.on('end', async collected => {
    if (collected.map(c => c).length === 0) {
      await interaction.editReply({ content: commands.panel.sub.remove.response.cancel, components: [] });
    };
    return;
  });
};

module.exports = panelRemove;
