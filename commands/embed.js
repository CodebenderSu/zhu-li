const { SlashCommandBuilder } = require('@discordjs/builders');

const { locale, embed: { color } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
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
		await interaction.deferReply({ ephemeral: true });
// Setup variables
    const { options } = interaction;
    const optColor = options.getString('color');
    const desc = options.getString('desc').split('\\n').join('\n');
    let rawEmbed = {
      color: optColor ? optColor : color,
    	title: options.getString('title'),
    	url: options.getString('url'),
    	author: {
    		name: options.getString('authname'),
    		icon_url: options.getString('authicon'),
    		url: options.getString('authurl'),
    	},
    	description: desc,
    	thumbnail: {
    		url: options.getString('thumbnail'),
    	},
      image: {
    		url: options.getString('image'),
    	},
    	timestamp: options.getBoolean('timestamp') ? new Date() : undefined,
    	footer: {
    		text: options.getString('foottext'),
    		icon_url: options.getString('footicon'),
    	}
    };
    await interaction.editReply({ embeds: [rawEmbed] });
	}
};
