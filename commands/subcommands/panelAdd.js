const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const panelSchema = require('../../schemas/panelSchema');
const { locale } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelAdd = async (interaction) => {
// Setup variables
  const role = interaction.options.getRole(commands.panel.sub.add.args.role.name);
  const alias = interaction.options.getString(commands.panel.sub.add.args.alias.name);
  const newRoleObj = {
    name: role.name,
    roleId: role.id,
    alias: alias ? alias : role.name
  };
  const panels = await panelSchema.find({ guildId: interaction.guildId });
// Create dropdown menu
  let options = [];
  panels.forEach(p => options.push({ label: p.name, value: p.name }));
  const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId('panel-add-select')
        .setPlaceholder(commands.panel.sub.add.response.placeholder)
        .addOptions(options)
    )
  const filter = i => (i.customId === 'panel-add-select') && i.user.id === interaction.user.id;
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 });
// Initial response
  await interaction.editReply({ content: commands.panel.sub.add.response.select, components: [row] });
// Handle selection
  collector.on('collect', async i => {
    const name = i.values[0];
    const panel = await panelSchema.findOne({ guildId: interaction.guildId, name: name });
    // Check for duplicate panel
    if (panel.roles.find(r => r.roleId === role.id)) {
      await interaction.editReply({ content: commands.panel.sub.add.response.duplicate.replace('__role__', role.name).replace('__name__', name), components: [] });
      return;
    };
    // Update DB
    try {
      const res = await panelSchema.updateOne({ guildId: interaction.guildId, name: name }, { $addToSet: { roles: newRoleObj } });
      await interaction.editReply({ content: commands.panel.sub.add.response.success.replace('__role__', role.name).replace('__name__', name), components: [] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ content: commands.panel.sub.add.response.fail, components: [] });
    };
  })
  // Cancel command on timeout
  collector.on('end', async collected => {
    if (collected.map(c => c).length === 0) {
      await interaction.editReply({ content: commands.panel.sub.add.response.cancel, components: [] });
    };
    return;
  });
};

module.exports = panelAdd;
