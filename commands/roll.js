const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { locale, embed: { color, footerIconUrl, thumbnailRoll } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, phrases } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.roll.name)
		.setDescription(commands.roll.desc)
    .addIntegerOption(option =>
      option.setName('type')
      .setDescription(commands.roll.args.type)
      .setRequired(true)
      .addChoice('d4', 4)
      .addChoice('d6', 6)
      .addChoice('d8', 8)
      .addChoice('d10', 10)
      .addChoice('d12', 12)
      .addChoice('d20', 20)
      .addChoice('d100', 100))
    .addIntegerOption(option =>
  		option.setName('n')
  		.setDescription(commands.roll.args.n)
			.setMinValue(1)
			.setMaxValue(100))
    .addIntegerOption(option =>
  		option.setName('bonuses')
  		.setDescription(commands.roll.args.bonuses))
  ,
	async execute(interaction) {
		await interaction.deferReply();
// Setup variables
    const type = interaction.options.getInteger('type');
    const n = interaction.options.getInteger('n');
    const bonuses = interaction.options.getInteger('bonuses');
    let number = 1; if (n) number = n;
    let bonus = 0; if (bonuses) bonus = bonuses;
    let caller = interaction.user.username; if (interaction.guild) caller = interaction.member.displayName;
// Variable validation
    if (number < 1 || number > 100 ) {
      await interaction.editReply(commands.roll.response.invalidN.replace('__n__', number)); return;
    };
    if (bonus < -1000000 || bonus > 1000000) {
      await interaction.editReply(commands.roll.response.invalidBonus.replace('__bonus__', bonus)); return;
    };
// Roll logic
    const calcRolls = (faces, count) => {
      let res = [];
      while (res.length < count) {
        res.push(Math.floor(Math.random() * faces) + 1)
      };
      return res;
    };
    const rawResults = calcRolls(type, number);
    const results = `\`${rawResults.join('` + `')}\``;
    const sum = rawResults.reduce((a, b) => a + b);
// Create embed response
    const rollEmbed = new MessageEmbed()
      .setColor(color)
      .setDescription(commands.roll.response.embedDesc
        .replace('__phrase__', phrases[(Math.floor(Math.random() * phrases.length))])
        .replace('__u__', caller)
        .replace('__n__', number)
        .replace('__type__', type)
        .replace('__results__', results)
        .replace('__sum__', sum)
        .replace('__bonus__', bonus)
        .replace('__total__', (sum + bonus)))
      .setThumbnail(thumbnailRoll)
      .setTimestamp()
      .setFooter({
        text: commands.roll.response.embedFoot.replace('__u__', interaction.user.tag),
        icon_url: footerIconUrl
      })
    await interaction.editReply({ embeds: [rollEmbed] });
	}
};
