const { MessageEmbed } = require('discord.js');

const guildSchema = require('../../schemas/guildSchema');
const { locale, embed: { color, footerIconUrl } } = require(`../../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../../lang/${locale}.json`);

const panelList = async (interaction) => {
// Setup variables
  const name = interaction.options.getString(commands.panel.sub.list.args.name.name);
  const data = await guildSchema.find({ id: interaction.guildId });
  const panels = data[0].panels;
  let desc = '';
  let author = commands.panel.sub.list.response.embedAuthorPanel;
// Condition checks to adjust variables
  // No panels
  if (panels.length === 0) {
    desc = commands.panel.sub.list.response.noPanels
      .replace('__command__', `${commands.panel.name} ${commands.panel.sub.create.name}`);
  // List panels
} else if (!name) {
    panels.forEach(i => desc = desc.concat(commands.panel.sub.list.response.embedDescPanel
      .replace('__name__', i.name)
      .replace('__bool__', i.active)));
  } else {
    const selectPanel = panels.find(i => i.name === name);
    author = commands.panel.sub.list.response.embedAuthorRole.replace('__name__', name)
  // List roles of a panel
    if (selectPanel && selectPanel.length > 0) {
      selectPanel.roles.forEach(i => desc = desc.concat(commands.panel.sub.list.response.embedDescRole
        .replace('__name__', i.name)
        .replace('__alias__', i.alias)));
  // No roles
    } else {
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
