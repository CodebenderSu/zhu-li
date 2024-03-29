const { SlashCommandBuilder } = require('@discordjs/builders');

const { locale } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.ping.name)
		.setDescription(commands.ping.desc),
	async execute(interaction) {
		await interaction.reply(commands.ping.response.success);
	}
};
