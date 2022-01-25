const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

const panelAdd = require('./subcommands/panelAdd');
const panelRemove = require('./subcommands/panelRemove');
const panelCreate = require('./subcommands/panelCreate');
const panelDelete = require('./subcommands/panelDelete');
const panelList = require('./subcommands/panelList');
const guildSchema = require('../schemas/guildSchema');
const { locale, embed: { color, footerIconUrl } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../lang/${locale}.json`);

const reqPerms = [
	Permissions.FLAGS.MANAGE_ROLES
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.panel.name)
		.setDescription(commands.panel.desc)
    .addSubcommand(subcommand =>
		    subcommand.setName(commands.panel.sub.add.name)
        .setDescription(commands.panel.sub.add.desc)
        .addRoleOption(option =>
          option.setName(commands.panel.sub.add.args.role.name)
          .setDescription(commands.panel.sub.add.args.role.desc)
          .setRequired(true))
        .addStringOption(option =>
          option.setName(commands.panel.sub.add.args.alias.name)
          .setDescription(commands.panel.sub.add.args.alias.desc))
        .addStringOption(option =>
          option.setName(commands.panel.sub.add.args.color.name)
          .setDescription(commands.panel.sub.add.args.color.desc)
          .addChoice(commands.panel.sub.add.args.color.choices.green.name, 'SUCCESS')
          .addChoice(commands.panel.sub.add.args.color.choices.blue.name, 'PRIMARY')
          .addChoice(commands.panel.sub.add.args.color.choices.red.name, 'DANGER')
          .addChoice(commands.panel.sub.add.args.color.choices.grey.name, 'SECONDARY')))
    .addSubcommand(subcommand =>
		    subcommand.setName(commands.panel.sub.remove.name)
        .setDescription(commands.panel.sub.remove.desc)
        .addRoleOption(option =>
          option.setName(commands.panel.sub.remove.args.role.name)
          .setDescription(commands.panel.sub.remove.args.role.desc)
          .setRequired(true)))
    .addSubcommand(subcommand =>
		    subcommand.setName(commands.panel.sub.create.name)
        .setDescription(commands.panel.sub.create.desc)
        .addStringOption(option =>
          option.setName(commands.panel.sub.create.args.name.name)
          .setDescription(commands.panel.sub.create.args.name.desc)
          .setRequired(true)))
    .addSubcommand(subcommand =>
		    subcommand.setName(commands.panel.sub.delete.name)
        .setDescription(commands.panel.sub.delete.desc))
    .addSubcommand(subcommand =>
		    subcommand.setName(commands.panel.sub.list.name)
        .setDescription(commands.panel.sub.list.desc)
        .addStringOption(option =>
          option.setName(commands.panel.sub.list.args.name.name)
          .setDescription(commands.panel.sub.list.args.name.desc)))
  ,
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
// Handle DM no access
    if (!interaction.guild) {
      await interaction.editReply(errors.noAccess); return;
    };
// Handle no permission
		reqPerms.forEach(async perm => {
			if (!interaction.guild.me.permissions.has(perm)) {
				await interaction.editReply(errors.noPermsBot.replace('__p__', perm)); return;
			};
			if (!interaction.member.permissions.has(perm)) {
				await interaction.editReply(errors.noPermsUser.replace('__p__', perm)); return;
			};
		});
// Panel subcommand handling
    switch (interaction.options.getSubcommand()) {
      case commands.panel.sub.add.name: // ADD
        panelAdd(interaction); break;
      case commands.panel.sub.remove.name: // REMOVE
        panelRemove(interaction); break;
      case commands.panel.sub.create.name: // CREATE
        panelCreate(interaction); break;
      case commands.panel.sub.delete.name: // DELETE
        panelDelete(interaction); break;
      case commands.panel.sub.list.name: // LIST
        panelList(interaction); break;
      default:
        return;
    };
	}
};
