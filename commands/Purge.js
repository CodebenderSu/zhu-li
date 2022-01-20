const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
// const wait = require('util').promisify(setTimeout);

const { locale } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors } = require(`../lang/${locale}.json`);

const reqPerms = [
	Permissions.FLAGS.MANAGE_MESSAGES
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.purge.name)
		.setDescription(commands.purge.desc)
    .addIntegerOption(option =>
  		option.setName('n')
  		.setDescription(commands.purge.args.n)
			.setMinValue(1)
			.setMaxValue(100)
			.setRequired(true))
    .addUserOption(option =>
      option.setName('target')
      .setDescription(commands.purge.args.target))
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
		const n = interaction.options.getInteger('n');
		const t = interaction.options.getUser('target');
// Purge logic
    if (n > 0 && n <= 100) { // /^\d+$/.test(n)
      // Purge messages by target
      if (t) {
        const tMessages = [];
        // Filter messages by target
        await interaction.channel.messages.fetch({ limit: 100 })
          .then(async messages => {
            let i = n;
            messages.filter(m => m.author.id === t.id)
              .forEach(msg => {
                if (i > 0) { tMessages.push(msg); i--; };
              });
          });
        // Delete messages
        await interaction.channel.bulkDelete(tMessages, true)
          .then(async messages => {
            await interaction.editReply(commands.purge.response.successWithTarget
              .replace('__n__', messages.size)
              .replace('__t__', t.tag));
            return;
          })
          .catch(async () => {
            await interaction.editReply(commands.purge.response.noscope);
            return;
          });
        return;
      } else {
      // Purge messages without target
        await interaction.channel.bulkDelete(n, true)
          .then(async messages => {
            await interaction.editReply(commands.purge.response.success
              .replace('__n__', messages.size));
            return;
          })
          .catch(async () => {
            await interaction.editReply(commands.purge.response.noscope);
            return;
          });
      };
    } else {
    // Handle invalid integer
      await interaction.editReply(commands.purge.response.invalid.replace('__n__', n));
			return;
    };
	}
};
