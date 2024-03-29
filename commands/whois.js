const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

const { locale, embed: { color, footerIconUrl, thumbnailWhois } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors, activities } = require(`../lang/${locale}.json`);

const reqPerms = [

];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.whois.name)
		.setDescription(commands.whois.desc)
    .addUserOption(option =>
      option.setName(commands.whois.args.target.name)
      .setDescription(commands.whois.args.target.desc)
      .setRequired(true))
  ,
	async execute(interaction) {
		await interaction.deferReply();
// Handle DM no access
    if (!interaction.guild) {
      await interaction.editReply(errors.noAccess); return;
    };
// Handle no permission
		reqPerms.forEach(async perm => {
			if (!interaction.guild.me.permissions.has(perm)) {
	      await interaction.editReply(errors.noPermsBot.replace('__p__', perm)); return;
	    };
	    if (!interaction.member.permissions.has(perm)) {
	      await interaction.editReply(errors.noPermsUser.replace('__p__', perm)); return;
	    };
		});
// Setup variables
    const user = interaction.options.getUser(commands.whois.args.target.name);
    const member = interaction.options.getMember(commands.whois.args.target.name);
    let rolesObj = {}; // Sort roles into order they are in server settings, instead of order created
    member.roles.cache.map(r => rolesObj = { ...rolesObj, [r.rawPosition]: `\`${r.name}\`` });
    const roles = Object.values(rolesObj).reverse().join(', ');
// Create embed response
    const whoisEmbed = new MessageEmbed()
			.setColor(member.displayHexColor ? member.displayHexColor === '#000000' ? color : member.displayHexColor : color)
			.setAuthor({ name: user.tag })
			.setDescription(commands.whois.response.embedDesc
        .replace('__m_displayName__', member.displayName)
        .replace('__u_bot__', user.bot)
        .replace('__m_voice_deaf__', member.voice.deaf)
        .replace('__m_voice_mute__', member.voice.mute)
        .replace('__m_voice_channel__', !member.voice.channel ? 'none' : member.voice.channel.name)
        .replace('__m_roles__', roles)
        .replace('__m_joinedAt__', member.joinedAt)
        .replace('__u_createdAt__', user.createdAt))
			.setThumbnail(thumbnailWhois)
			.setImage(user.avatarURL({ dynamic: true }))
			.setTimestamp()
			.setFooter({
        text: commands.whois.response.embedFoot.replace('__u__', interaction.user.tag),
        iconURL: footerIconUrl
      })
    await interaction.editReply({ embeds: [whoisEmbed] });
	}
};
