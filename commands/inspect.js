const { SlashCommandBuilder } = require('@discordjs/builders');

const { main: { locale, color } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors } = require(`../lang/${locale}.json`);

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
// Create embed response
    const { guild, member, user, channel } = interaction;
    const bans = await guild.bans.fetch().catch('null');
    const invites = await guild.invites.fetch().catch('null');
    const owner = await guild.fetchOwner().catch('null');
    const roles = await guild.roles.fetch().catch('null');
    const inspectEmbed = {
      color,
      author: { name: commands.inspect.response.embedAuthor },
      thumbnail: { url: guild.iconURL({ dynamic: true }) },
      footer: {
        text: commands.inspect.response.embedFoot.replace('__u__', user.tag),
        icon_url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/robot-face_1f916.png'
      },
      timestamp: new Date(),
      description: commands.inspect.response.embedDesc
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
        .replace('__channel_type__', channel.type)
    };
    await interaction.editReply({ embeds: [inspectEmbed] });
	}
};
