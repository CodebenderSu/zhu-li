const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
// const wait = require('util').promisify(setTimeout);

const { main: { locale } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription(commands.purge.desc)
    .addStringOption(option =>
  		option.setName('n')
  			.setDescription(commands.purge.args.n)
  			.setRequired(true)),
	async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const n = interaction.options.getString('n');

    if (!interaction.guild) {
      await interaction.editReply(errors.noAccess); return;
    };
    if (!interaction.guild.me.permissions.has(Permissions.MANAGE_MESSAGES)) {
      await interaction.editReply(errors.noPermsBot); return;
    };
    if (!interaction.member.permissions.has(Permissions.MANAGE_MESSAGES)) {
      await interaction.editReply(errors.noPermsUser); return;
    };
    if (/^\d+$/.test(n)) {
      await interaction.channel.bulkDelete(n, true)
        .catch(async () => {
          await interaction.editReply(commands.purge.response.noscope);
          return;
        });
      await interaction.editReply(commands.purge.response.success.replace('__n__', n));
    } else {
      await interaction.editReply(commands.purge.response.invalid.replace('__n__', n));
    };
    return;
	}
};
