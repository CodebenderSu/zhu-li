const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Permissions } = require('discord.js');

const { locale } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
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
      case commands.panel.sub.add.name: async () => {
      // Setup variables
        const role = interaction.options.getRole(commands.panel.sub.add.args.role.name);
        const alias = interaction.options.getString(commands.panel.sub.add.args.alias.name);
        const color = interaction.options.getString(commands.panel.sub.add.args.color.name);
      // Create dropdown menu
        // something
      // POST to database
        // something
        await interaction.editReply('add');
      }; break;
      case commands.panel.sub.remove.name: async () => {
      // Setup variables
        const role = interaction.options.getRole(commands.panel.sub.remove.args.role.name);
      // Create dropdown menu
        // something
      // POST to database
        await interaction.editReply('remove');
      }; break;
      case commands.panel.sub.create.name: async () => {
      // Setup variables
        const name = interaction.options.getString(commands.panel.sub.create.args.name.name);
      // POST to database
        await interaction.editReply('create');
      }; break;
      case commands.panel.sub.delete.name: async () => {
      // Create dropdown menu
        // something
      // POST to database
        await interaction.editReply('delete');
      }; break;
      case commands.panel.sub.list.name: async () => {
      // Setup variables
        const name = interaction.options.getString(commands.panel.sub.list.args.name.name);
      // Create embed response
        await interaction.editReply('list');
      }; break;
      default:
        return;
    }
	}
};
