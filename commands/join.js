const { SlashCommandBuilder } = require('@discordjs/builders');

const { locale, joinLink, embed: { color } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.join.name)
		.setDescription(commands.join.desc),
	async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const joinEmbed = {
      color,
      thumbnail: { url: interaction.client.user.avatarURL({ dynamic: true }) },
      description: `${commands.join.response.embedDesc}${joinLink}`
    };
		await interaction.editReply({ embeds: [joinEmbed] });
	}
};
