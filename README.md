# Zhu Li - A Bot Made for Discord
!["Named her the Zhu Li"](https://media.giphy.com/media/3JUOZZbFPanES4UoCp/giphy.gif)

## About
Zhu Li is a bot named after the Legend of Korra character by the same name. Like its namesake, it is designed to act as an assistant to Discord server owners and staff.

## Features
Current commands include:

* Help - Generates an embed with list of commands
* Ping - Pong!
* Purge - Purges a number of posts
* WhoIs - User lookup
* DoTheThing - Does something random
* Bravo - Bravo, sir

Planned features include:

* Role add/removal
* Per guild custom role database, including an artificial 'alias' attribute that server owners may use as a shorthand for their roles
* Addrole/delrole commands to add and remove roles from database with arguments for custom alias.

## Dependencies
Zhu Li is built on NPM and Node using [Discord.js](https://discord.js.org/#/).

## How to Use It
1. Open up "config.json" in the data folder. Change Token to your personal bot token. Optionally, fill in the OwnerID. Save.
2. In the command line/shell, navigate to the folder containing the bot ("cd SomeDirectory", ect.).
3. Type "npm i". Wait for it to finish.
4. Type "node Bot.js". Bot will show as online with a checkpoint being logged in the console. The bot is now online.
5. To take the bot offline, type CTRL+C in the command line.
