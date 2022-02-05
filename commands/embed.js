const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, Permissions } = require('discord.js');

const panelSchema = require('../schemas/panelSchema');
const { locale, embed: { color }, validColorStr } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors } = require(`../lang/${locale}.json`);

const reqPerms = [
	Permissions.FLAGS.MANAGE_ROLES
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.embed.name)
		.setDescription(commands.embed.desc)
    .addStringOption(option =>
      option.setName(commands.embed.args.desc.name)
      .setDescription(commands.embed.args.desc.desc)
      .setRequired(true))
    .addStringOption(option =>
      option.setName(commands.embed.args.color.name)
      .setDescription(commands.embed.args.color.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.title.name)
      .setDescription(commands.embed.args.title.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.url.name)
      .setDescription(commands.embed.args.url.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.authName.name)
      .setDescription(commands.embed.args.authName.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.authIcon.name)
      .setDescription(commands.embed.args.authIcon.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.authUrl.name)
      .setDescription(commands.embed.args.authUrl.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.thumbnail.name)
      .setDescription(commands.embed.args.thumbnail.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.image.name)
      .setDescription(commands.embed.args.image.desc))
    .addBooleanOption(option =>
      option.setName(commands.embed.args.timestamp.name)
      .setDescription(commands.embed.args.timestamp.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.footText.name)
      .setDescription(commands.embed.args.footText.desc))
    .addStringOption(option =>
      option.setName(commands.embed.args.footIcon.name)
      .setDescription(commands.embed.args.footIcon.desc))
		.addStringOption(option =>
			option.setName(commands.embed.args.panel.name)
			.setDescription(commands.embed.args.panel.desc))
  ,
	async execute(interaction) {
		await interaction.deferReply();
// Setup variables
    const { options } = interaction;
    const optColor = options.getString(commands.embed.args.color.name);
    const colorIsValid = (input) => {
      let res = false;
      const hexHash = /^#[0-9A-F]{6}$/i; const hex = /^[0-9A-F]{6}$/i;
      if (validColorStr.find(c => c === input)) res = true;
      if (hexHash.test(input)) res = true;
      if (hex.test(input)) res = true;
      return res;
    };
    const title = options.getString(commands.embed.args.title.name);
    const authName = options.getString(commands.embed.args.authName.name);
    // Check for invalid descriptions while providing functionality for \n characters
    let desc = options.getString(commands.embed.args.desc.name);
    desc = desc.split('\\n').filter(d => d !== '');
    if (desc.length > 0) {
      desc = desc.join('\n')
    } else {
      desc = commands.embed.response.invalidDesc;
    };
    const footText = options.getString(commands.embed.args.footText.name);
		const panelName = options.getString(commands.embed.args.panel.name);
// Create embed response
    const newEmbed = new MessageEmbed()
      .setColor(optColor ? colorIsValid(optColor.toUpperCase()) ? optColor.toUpperCase() : color : color)
      .setTitle(title ? title.length < 256 ? title : commands.embed.response.limitTitle : '')
      .setURL(options.getString(commands.embed.args.url.name))
      .setAuthor({
    		name: authName ? authName.length < 256 ? authName : commands.embed.response.limitName : '',
    		iconURL: options.getString(commands.embed.args.authIcon.name),
    		url: options.getString(commands.embed.args.authUrl.name),
    	})
      .setDescription(desc.length < 4096 ? desc : commands.embed.response.limitDesc)
      .setThumbnail(options.getString(commands.embed.args.thumbnail.name))
      .setImage(options.getString(commands.embed.args.image.name))
      .setTimestamp(options.getBoolean(commands.embed.args.timestamp.name) ? new Date() : '')
      .setFooter({
    		text: footText ? footText.length < 2048 ? footText : commands.embed.response.limitFoot : '',
    		iconURL: options.getString(commands.embed.args.footIcon.name),
    	})
    ;
    if (newEmbed.length > 6000) {
      await interaction.editReply(commands.embed.response.limitEmbed); return;
    };
// Handle panel logic
		let dropdown = [];
		if (panelName) {
	    if (!interaction.guild) { // Handle DM no access
				await interaction.editReply({ embeds: [newEmbed] });
	      await interaction.followUp({ content: errors.noAccess, ephemeral: true }); return;
	    };
			reqPerms.forEach(async perm => { // Handle no permission
				if (!interaction.guild.me.permissions.has(perm)) {
					await interaction.editReply({ embeds: [newEmbed] });
					await interaction.followUp({ content: errors.noPermsBot.replace('__p__', perm), ephemeral: true }); return;
				};
				if (!interaction.member.permissions.has(perm)) {
					await interaction.editReply({ embeds: [newEmbed] });
					await interaction.followUp({ content: errors.noPermsUser.replace('__p__', perm), ephemeral: true }); return;
				};
			});
			const panel = await panelSchema.findOne({ guildId: interaction.guildId, name: panelName });
			if (!panel) { // Handle invalid panel name
				await interaction.editReply({ embeds: [newEmbed] });
				await interaction.followUp({
					content: commands.embed.response.panelInvalid
						.replace('__name__', panelName)
						.replace('__command__', `${commands.panel.name} ${commands.panel.sub.create.name}`),
					ephemeral: true });
				return;
			};
			if (panel.roles.length === 0) { // Handle empty panel
				await interaction.editReply({ embeds: [newEmbed] });
				await interaction.followUp({
					content: commands.embed.response.panelEmpty
						.replace('__name__', panelName)
						.replace('__command__', `${commands.panel.name} ${commands.panel.sub.add.name}`),
					ephemeral: true });
				return;
			};
			// Create panel dropdown menu
	      let panelOptions = [];
	      panel.roles.forEach(r => panelOptions.push({ label: r.alias, value: r.roleId }));
	      dropdown.push(new MessageActionRow()
	        .addComponents(
	          new MessageSelectMenu()
	            .setCustomId(`embed-panel`)
	            .setPlaceholder(commands.embed.response.panelPlaceholder)
							.setMaxValues(panelOptions.length)
							.setMinValues(0)
	            .addOptions(panelOptions)
	        ));
		};
// Create final response
		await interaction.editReply({ embeds: [newEmbed], components: dropdown });
		await interaction.followUp({ content: commands.embed.response.success, ephemeral: true });
	}
};
