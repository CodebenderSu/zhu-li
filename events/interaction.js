const { locale } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const { commands, errors } = require(`../lang/${locale}.json`);

const handleInteraction = async (interaction, client) => {

  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
  	if (!command) return;

  	try {
  		await command.execute(interaction);
  	} catch (err) {
  		console.error(err);
  		await interaction.reply({ content: errors.cmdFail, ephemeral: true });
  	};
    return;
  };

  if (interaction.isSelectMenu()) {
    switch (interaction.customId) {
      case 'embed-panel':
        await interaction.deferReply({ ephemeral: true });
        // Grab all dropdown options and values
        const { options } = interaction.message.components[0].components[0];
        let values = [];
        options.forEach(opt => values.push(opt.value));
        // Add selected roles
        interaction.values.forEach(async id => {
          const role = interaction.guild.roles.cache.get(id);
          const hasRole = interaction.member.roles.cache.has(id);
          const memberRoles = interaction.member.roles;
          values = values.filter(v => v !== id);
          if (!hasRole) {
            try { await memberRoles.add(id) }
            catch (err) {
              console.error(err);
              await interaction.followUp({ content: errors.fail, ephemeral: true })
            };
          };
        });
        // Remove any roles that are not selected
        values.forEach(async id => {
          const role = interaction.guild.roles.cache.get(id);
          const hasRole = interaction.member.roles.cache.has(id);
          const memberRoles = interaction.member.roles;
          if (hasRole) {
            try { await memberRoles.remove(id) }
            catch (err) {
              console.error(err);
              await interaction.followUp({ content: errors.fail, ephemeral: true })
            };
          };
        });
        // Reply with results
        await interaction.editReply({ content: commands.embed.response.panelUpdateSuccess });
        break;
      default:
        return;
    }
  };
  return;
};

module.exports = handleInteraction;
