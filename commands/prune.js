const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Permissions } = require('discord.js');

const { locale } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors } = require(`../lang/${locale}.json`);

const reqPerms = [
	Permissions.FLAGS.KICK_MEMBERS
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.prune.name)
		.setDescription(commands.prune.desc)
    .addIntegerOption(option =>
  		option.setName('days')
  		.setDescription(commands.prune.args.days)
			.setMinValue(1)
			.setMaxValue(30)
			.setRequired(true))
  ,
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
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
    const d = interaction.options.getInteger('days');
    const row = new MessageActionRow()
      .addComponents(new MessageButton()
        .setCustomId('yes')
        .setLabel('Confirm')
        .setStyle('SUCCESS'))
      .addComponents(new MessageButton()
        .setCustomId('no')
        .setLabel('Cancel')
        .setStyle('DANGER'))
    const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 });
// Prune logic
    if (d > 0 && d <= 30) {
      await interaction.guild.members.prune({ days: d, dry: true })
        .then(async pruned => {
          // Ask user to confirm or cancel command
          await interaction.editReply({ content: commands.prune.response.confirm.replace('__n__', pruned), components: [row] });
          collector.on('collect', async i => {
          	switch (i.customId) {
              case 'yes':
                // Carry out command
                await interaction.guild.members.prune({ days: d })
                  .then(async pruned => {
                    await interaction.editReply({ content: commands.prune.response.success.replace('__n__', pruned), components: [] });
                    return;
                  })
                  .catch(async err => {
                    await interaction.editReply({ content: commands.prune.response.fail.replace('__err__', err.message), components: []});
                    return;
                  });
                return;
              case 'no': /* Falls through */
              default:
                await interaction.editReply({ content: commands.prune.response.cancel, components: [] });
                return;
            };
          });
          // Cancel command on timeout
          collector.on('end', async () => {
            await interaction.editReply({ content: commands.prune.response.cancel, components: [] });
            return;
          });
          return;
        })
        .catch(async err => {
          await interaction.editReply(commands.prune.response.fail.replace('__err__', err.message));
          return;
        });
    } else {
      await interaction.editReply(commands.prune.response.invalid.replace('__d__', d));
      return;
    };
	}
};
