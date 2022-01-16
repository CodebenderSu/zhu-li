const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
// const wait = require('util').promisify(setTimeout);

const { main: { locale } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors } = require(`../lang/${locale}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription(commands.purge.desc)
    .addStringOption(option =>
  		option.setName('n')
  		.setDescription(commands.purge.args.n)
  		.setRequired(true))
    .addUserOption(option =>
      option.setName('target')
      .setDescription(commands.purge.args.target))
  ,
	async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const n = interaction.options.getString('n');
    const t = interaction.options.getUser('target');
// Handle DM no access
    if (!interaction.guild) {
      await interaction.editReply(errors.noAccess); return;
    };
// Handle no permission
    if (!interaction.guild.me.permissions.has(Permissions.MANAGE_MESSAGES)) {
      await interaction.editReply(errors.noPermsBot); return;
    };
    if (!interaction.member.permissions.has(Permissions.MANAGE_MESSAGES)) {
      await interaction.editReply(errors.noPermsUser); return;
    };
// Purge logic
    if (/^\d+$/.test(n)) {
      // Purge messages by target
      if (t) {
        const username = `${t.username}#${t.discriminator}`;
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
              .replace('__t__', username));
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
    // Handle invalid number
      await interaction.editReply(commands.purge.response.invalid.replace('__n__', n));
    };
    return;
	}
};
