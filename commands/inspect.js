const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

const { locale, embed: { color, footerIconUrl } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors } = require(`../lang/${locale}.json`);

const reqPerms = [
  Permissions.FLAGS.MANAGE_GUILD,
  Permissions.FLAGS.BAN_MEMBERS
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.inspect.name)
		.setDescription(commands.inspect.desc),
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
    const { guild, member, user, channel } = interaction;
    const bans = await guild.bans.fetch().catch('null');
    const invites = await guild.invites.fetch().catch('null');
    const owner = await guild.fetchOwner().catch('null');
    const roles = await guild.roles.fetch().catch('null');
// Create embed response
    const inspectEmbed = new MessageEmbed()
      .setColor(color)
      .setAuthor({ name: commands.inspect.response.embedAuthor })
      .setDescription(commands.inspect.response.embedDesc
        .replace('__guild_name__', guild.name)
        .replace('__guild_id__', guild.id)
        .replace('__guild_createdAt__', guild.createdAt)
        .replace('__guild_region__', guild.preferredLocale)
        .replace('__guild_channels__', guild.channels.channelCountWithoutThreads)
        .replace('__guild_roles__', Array.from(roles.values()).length)
        .replace('__guild_memberCount__', guild.memberCount)
        .replace('__bans__', !bans || !bans.size ? '0' : bans.size)
        .replace('__invites__', !invites || !invites.size ? '0' : invites.size)
        .replace('__guild_owner__', `${owner.nickname} (${owner.user.tag})`)
        .replace('__guild_ownerID__', owner.id)
        .replace('__channel_name__', channel.name)
        .replace('__channel_id__', channel.id)
        .replace('__channel_type__', channel.type))
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: commands.inspect.response.embedFoot.replace('__u__', user.tag),
        icon_url: footerIconUrl
      })
    await interaction.editReply({ embeds: [inspectEmbed] });
	}
};
