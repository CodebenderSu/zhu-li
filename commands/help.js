const { SlashCommandBuilder } = require('@discordjs/builders');

const { locale, embed: { color } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.help.name)
		.setDescription(commands.help.desc)
  ,
	async execute(interaction) {
		await interaction.deferReply();
// Dynamic user name (use nickname in guild)
    let caller = interaction.user.username; if (interaction.guild) caller = interaction.member.nickname;
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
    const helpEmbed = {
      color,
      description: commands.help.response.embedDesc.replace('__u__', caller),
      footer: {
        text: commands.help.response.embedFoot.replace('__u__', interaction.user.tag),
        icon_url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/robot-face_1f916.png'
      },
      timestamp: new Date(),
      fields: [
        { name: commands.help.response.embedField1Name, value: fieldValue }
      ]
    };
    await interaction.editReply({ embeds: [helpEmbed] });
	}
};
