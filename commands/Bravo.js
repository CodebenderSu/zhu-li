const { SlashCommandBuilder } = require('@discordjs/builders');

const { main: { locale } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bravo')
		.setDescription(commands.bravo.desc),
	async execute(interaction) {
		await interaction.reply(commands.bravo.response.success);
	}
};
