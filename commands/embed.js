const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { locale, embed: { color }, validColorStr } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.embed.name)
		.setDescription(commands.embed.desc)
    .addStringOption(option =>
      option.setName('desc')
      .setDescription(commands.embed.args.desc)
      .setRequired(true))
    .addStringOption(option =>
      option.setName('color')
      .setDescription(commands.embed.args.color))
    .addStringOption(option =>
      option.setName('title')
      .setDescription(commands.embed.args.title))
    .addStringOption(option =>
      option.setName('url')
      .setDescription(commands.embed.args.url))
    .addStringOption(option =>
      option.setName('authname')
      .setDescription(commands.embed.args.authName))
    .addStringOption(option =>
      option.setName('authicon')
      .setDescription(commands.embed.args.authIcon))
    .addStringOption(option =>
      option.setName('authurl')
      .setDescription(commands.embed.args.authUrl))
    .addStringOption(option =>
      option.setName('thumbnail')
      .setDescription(commands.embed.args.thumbnail))
    .addStringOption(option =>
      option.setName('image')
      .setDescription(commands.embed.args.image))
    .addBooleanOption(option =>
      option.setName('timestamp')
      .setDescription(commands.embed.args.timestamp))
    .addStringOption(option =>
      option.setName('foottext')
      .setDescription(commands.embed.args.footText))
    .addStringOption(option =>
      option.setName('footicon')
      .setDescription(commands.embed.args.footIcon))
  ,
	async execute(interaction) {
		await interaction.deferReply();
// Setup variables
    const { options } = interaction;
    const optColor = options.getString('color');
    const colorIsValid = (input) => {
      let res = false;
      const hexHash = /^#[0-9A-F]{6}$/i; const hex = /^[0-9A-F]{6}$/i;
      if (validColorStr.find(c => c === input)) res = true;
      if (hexHash.test(input)) res = true;
      if (hex.test(input)) res = true;
      return res;
    };
    const title = options.getString('title');
    const authName = options.getString('authname');
    // Check for invalid descriptions while providing functionality for \n characters
    let desc = options.getString('desc');
    desc = desc.split('\\n').filter(d => d !== '');
    if (desc.length > 0) {
      desc = desc.join('\n')
    } else {
      desc = commands.embed.response.invalidDesc;
    };
    const footText = options.getString('foottext');
// Create embed response
    const newEmbed = new MessageEmbed()
      .setColor(optColor ? colorIsValid(optColor.toUpperCase()) ? optColor.toUpperCase() : color : color)
      .setTitle(title ? title.length < 256 ? title : commands.embed.response.limitTitle : '')
      .setURL(options.getString('url'))
      .setAuthor({
    		name: authName ? authName.length < 256 ? authName : commands.embed.response.limitName : '',
    		icon_url: options.getString('authicon'),
    		url: options.getString('authurl'),
    	})
      .setDescription(desc.length < 4096 ? desc : commands.embed.response.limitDesc)
      .setThumbnail(options.getString('thumbnail'))
      .setImage(options.getString('image'))
      .setTimestamp(options.getBoolean('timestamp') ? new Date() : '')
      .setFooter({
    		text: footText ? footText.length < 2048 ? footText : commands.embed.response.limitFoot : '',
    		icon_url: options.getString('footicon'),
    	})
    ;
    if (newEmbed.length > 6000) {
      await interaction.editReply(commands.embed.response.limitEmbed); return;
    };
    await interaction.editReply({ embeds: [newEmbed] });
	}
};
