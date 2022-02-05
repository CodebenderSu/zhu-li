const { MessageEmbed } = require('discord.js');

const panelSchema = require('../../schemas/panelSchema');
const { locale, embed: { color, footerIconUrl } } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelList = async (interaction) => {
// Setup variables
  const name = interaction.options.getString(commands.panel.sub.list.args.name.name);
  const panels = await panelSchema.find({ guildId: interaction.guildId });
  const panel = await panelSchema.findOne({ guildId: interaction.guildId, name: name });
// Check for no panels
  if (panels.length === 0) {
    await interaction.editReply(commands.panel.sub.list.response.noPanels
      .replace('__command__', `${commands.panel.name} ${commands.panel.sub.create.name}`));
    return;
  };
// Check for no panel by name
  if (name && !panel) {
    await interaction.editReply(commands.panel.sub.list.response.invalidPanel
      .replace('__name__', name)
      .replace('__command__', `${commands.panel.name} ${commands.panel.sub.create.name}`));
    return;
  };
// Dynamic variables
  let desc = '';
  let author = commands.panel.sub.list.response.embedAuthorPanel;
  if (!name) { // Populate desc with panels
    panels.forEach(p => desc = desc.concat(commands.panel.sub.list.response.embedDescPanel
      .replace('__name__', p.name)));
  } else { // Populate desc with roles
    author = commands.panel.sub.list.response.embedAuthorRole.replace('__name__', name)
    if (panel.roles.length > 0) { // List roles of a panel
      panel.roles.forEach(r => desc = desc.concat(commands.panel.sub.list.response.embedDescRole
        .replace('__name__', r.name)
        .replace('__alias__', r.alias)));
    } else { // No roles
      desc = commands.panel.sub.list.response.noRoles
        .replace('__command__', `${commands.panel.name} ${commands.panel.sub.add.name}`);
    };
  };
// Create embed response
  const listEmbed = new MessageEmbed()
    .setColor(color)
    .setAuthor({ name: author })
    .setDescription(desc)
    .setTimestamp()
    .setFooter({
      text: commands.panel.sub.list.response.embedFoot.replace('__u__', interaction.user.username),
      iconURL: footerIconUrl
    });
  await interaction.editReply({ embeds: [listEmbed] });
};

module.exports = panelList;
