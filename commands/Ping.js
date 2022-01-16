const { SlashCommandBuilder } = require('@discordjs/builders');

const { main: { locale } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(commands.ping.desc),
	async execute(interaction) {
		await interaction.reply(commands.ping.response.pong);
	}
};
