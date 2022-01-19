const { SlashCommandBuilder } = require('@discordjs/builders');

const { locale } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.bravo.name)
		.setDescription(commands.bravo.desc),
	async execute(interaction) {
		await interaction.reply(commands.bravo.response.success);
	}
};
