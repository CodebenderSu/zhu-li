require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { locale, main: { token, clientId, ownerGuild } } = require(`../settings/${process.env.ENV_CONFIG}config.js`);
const lang = require(`../lang/${locale}.json`);

const commands = [];
const dirPath = path.resolve(__dirname, '../commands');
const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	commands.push(command.data.toJSON());
};

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Refreshing application (/) commands...');
		await rest.put(
			Routes.applicationGuildCommands(clientId, ownerGuild),
			{ body: commands },
		);
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
