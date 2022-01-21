const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { locale, userDocs, embed: { color, footerIconUrl } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, greetings } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.help.name)
		.setDescription(commands.help.desc)
  ,
	async execute(interaction) {
		await interaction.deferReply();
// Dynamic user name (use nickname in guild)
    let caller = interaction.user.username; if (interaction.guild) caller = interaction.member.displayName;
// Create string with available commands from those registered with the bot
    const cmdList = interaction.client.commands.map(i => i.data.name);
    let fieldValue = ``;
    cmdList.forEach(cmd => {
      const name = commands[cmd].name;
      const desc = commands[cmd].desc;
      const strFragment = `\`/${name}\` - ${desc}\n`;
      fieldValue = fieldValue.concat(strFragment);
    })
// Create embed response
    const helpEmbed = new MessageEmbed()
			.setColor(color)
			.setTitle(commands.help.response.embedTitle)
			.setURL(userDocs)
			.setDescription(commands.help.response.embedDesc
				.replace('__greet__', greetings[(Math.floor(Math.random() * greetings.length))])
				.replace('__u__', caller))
			.addFields({ name: commands.help.response.embedField1Name, value: fieldValue })
			.setTimestamp()
			.setFooter({
        text: commands.help.response.embedFoot.replace('__u__', interaction.user.tag),
        icon_url: footerIconUrl
      })
    await interaction.editReply({ embeds: [helpEmbed] });
	}
};
