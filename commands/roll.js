const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { locale, embed: { color, footerIconUrl, thumbnailRoll } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, phrases } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.roll.name)
		.setDescription(commands.roll.desc)
    .addIntegerOption(option =>
      option.setName(commands.roll.args.type.name)
      .setDescription(commands.roll.args.type.desc)
      .setRequired(true)
      .addChoice(commands.roll.args.type.choices.d4.name, 4)
      .addChoice(commands.roll.args.type.choices.d6.name, 6)
      .addChoice(commands.roll.args.type.choices.d8.name, 8)
      .addChoice(commands.roll.args.type.choices.d10.name, 10)
      .addChoice(commands.roll.args.type.choices.d12.name, 12)
      .addChoice(commands.roll.args.type.choices.d20.name, 20)
      .addChoice(commands.roll.args.type.choices.d100.name, 100))
    .addIntegerOption(option =>
  		option.setName(commands.roll.args.n.name)
  		.setDescription(commands.roll.args.n.desc)
			.setMinValue(1)
			.setMaxValue(100))
    .addIntegerOption(option =>
  		option.setName(commands.roll.args.bonus.name)
  		.setDescription(commands.roll.args.bonus.desc))
  ,
	async execute(interaction) {
		await interaction.deferReply();
// Setup variables
    const type = interaction.options.getInteger(commands.roll.args.type.name);
    const n = interaction.options.getInteger(commands.roll.args.n.name);
    const bonuses = interaction.options.getInteger(commands.roll.args.bonus.name);
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
        iconURL: footerIconUrl
      })
    await interaction.editReply({ embeds: [rollEmbed] });
	}
};
