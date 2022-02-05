# Zhu Li - A Bot Made for Discord
!["Named her the Zhu Li"](https://media.giphy.com/media/3JUOZZbFPanES4UoCp/giphy.gif)

## About
Zhu Li is a bot named after the Legend of Korra character by the same name. Like its namesake, it is designed to act as an assistant to Discord server owners and staff.

## Features
* The following slash commands:
  * [**Bravo**](#bravo) - Bravo, sir
  * [**Embed**](#embed-desc-color-title-url-authname-authicon-authurl-thumbnail-image-timestamp-foottext-footicon) - Create a custom message embed
  * [**Help**](#help) - Lists all available commands and description
  * [**Inspect**](#inspect) - Provides server diagnostics
  * [**Panel**](#panel) - Reaction role management
  * [**Ping**](#ping) - Pong!
  * [**Prune**](#prune-days) - Prune inactive members
  * [**Purge**](#purge-n-target) - Deletes 'n' number of messages, up to 100 at a time (<14 days old)
  * [**Roll**](#roll-type-n-bonuses) - Roll a die or several
  * [**WhoIs**](#whois-target) - In depth user analysis
* Change the language of the bot responses by creating your own /lang .json file
* Customize bot activity status
* Easy to use

## Dependencies
  * Node v. 16.13.2
  * NPM v. 8.1.2
  * [Discord.js](https://discord.js.org/#/) v. ^13.6.0
  * Dotenv v. ^8.6.0
  * Nodemon v. ^2.0.15
  * Mongoose v. ^5.13.14

## Install and Setup
1. Setup a new bot application via the [Discord Developer Portal](https://discord.com/developers/applications)
2. Take note of the Client ID and Client Secret
3. Clone this repository with `git clone`
4. Open up "config.js" in the settings folder.
5. Change `clientId` and `token` to your Client ID and Client Secret respectively, from Step 2. Save.
6. In a command line/shell, navigate to the folder containing the bot (`cd SomeDirectory`, ect.).
7. Type `npm i`. Wait for it to finish.
8. Type `npm run start-rd`. The bot will then register slash commands and then start up.
9. If you don't need to deploy the slash commands, use `npm run start-r` instead.
10. To take the bot offline, type CTRL+C in the command line.

## Adding to Your Server
1. Navigate to the [Discord Developer Portal](https://discord.com/developers/applications)
2. From the left-hand side menu, go to "OAuth2". Then click "URL Generator".
3. Choose the following scopes:
  1. bot
  2. applications.commands
4. Next, choose the following permissions:
  * View Server Insights
  * Manage Server
  * Manage Roles
  * Manage Channels
  * Kick Members
  * Ban Members
  * Read Messages/View Channels
  * Moderate Members
  * Send Messages
  * Send Messages in Threads
  * Manage Messages
  * Manage Threads
  * Embed Links
  * Attach Files
  * Read Message History
  * Mention Everyone
  * Use Slash Commands
5. Copy the link that is generated in the "Generated URL" box.
6. In a new tab, paste the link and navigate to it.
7. Select a server to add the bot to and click "Continue".
8. Click "Authorize".

## End User Command Guide

### **/bravo**
Simple command in which the bot will respond with a gif of Zhu Li unenthusiastically applauding.

---
### **/embed** *{desc} [color, title, url, authname, authicon, authurl, thumbnail, image, timestamp, foottext, footicon, panel]*
A feature-rich command that allows you to build and customize your own Discord embed messages. The embed cannot exceed a combined total of 6000 characters.
#### Args
* **desc** - *Required* - The main body of your embed. Cannot exceed 4096 characters.
  * You can also use `\n` to create new lines, however make sure to put a space between two or more consecutive `\n` characters to create two or more new lines
    * `desc:Hello world` =>
      > Hello world

    * `desc:Hello\nworld` =>
      > Hello \
      world

    * `desc:Hello\n \nworld` =>
      > Hello
      >
      > world

* **color** - The color of the embed border. This has to be a valid color, see below:
  * Can be a 6-digit hex color, with or without the hash (use a [color picker](https://www.google.com/search?q=color+picker&sxsrf=AOaemvIEow35uMhl5hG-pgMCq7crLXhtJA%3A1642733177762&iflsig=ALs-wAMAAAAAYeosibVKmiGrbUerd2ta9ELlCa0-l2iZ&ved=0ahUKEwjb-5H86cH1AhUkgnIEHZJUDiEQ4dUDCAk&uact=5&oq=color+picker&sclient=gws-wiz) to help you)
    * `color:#a059fb`
    * `color:a059fb`
  * Can be one of the following codes (case insensitive)
    * DEFAULT, WHITE, AQUA, GREEN, BLUE, YELLOW, PURPLE, LUMINOUS_VIVID_PINK, FUCHSIA, GOLD, ORANGE, RED, GREY, NAVY, DARK_AQUA, DARK_GREEN, DARK_BLUE, DARK_PURPLE, DARK_VIVID_PINK, DARK_GOLD, DARK_ORANGE, DARK_RED, DARK_GREY, DARKER_GREY, LIGHT_GREY, DARK_NAVY, BLURPLE, GREYPLE, DARK_BUT_NOT_BLACK, NOT_QUITE_BLACK, RANDOM
    * `color:DARK_PURPLE`
    * `color:dark_purple`

* **title** - The title at the top of the embed. Cannot exceed 256 characters.
* **url** - The URL for the title, if you want to add a link.
  * `title:Regular old title` =>
  > Regular old title

  * `title:Cool title` `url:https://cool-link.yxj` =>
  > [Cool title]()

* **authname** - The name of the author, although you could also think of it like a header. Limited to 256 characters.
* **authicon** - The URL for adding an icon next to the author name.
* **authurl** - The URL for the author, if you want to add a link.
* **thumbnail** - The URL of an image to add to the upper right-hand corner of the embed.
* **image** - The URL of an image to add to the bottom of the embed.
* **timestamp** - (`true`, `false`) - Whether to include a timestamp in the embed. Defaults to false.
* **foottext** - The text in the footer of the embed. Limited to 2048 characters.
* **footicon** - The URL for adding an icon next to the footer text.
* **panel** - A valid name of an existing panel for your guild. Use `/panel list` for a listing.

---
### **/help**
Provides an embed with a listing of available commands and brief description of those commands.

---
### **/inspect**
Provides an embed with various details about the Discord server. CANNOT be used in DMs.

---
### **/panel**
Root command that has five subcommands:
> #### **/panel create** *{name}*
> Create a new panel for your guild.
> ##### Args
> * **name** - *Required* - The name for your new panel
>
> ---
> #### **/panel delete**
> Deletes a panel selected from a dropdown menu.
>
> ---
> #### **/panel addrole** *{role} [alias]*
> Adds a role to an existing panel.
> ##### Args
> * **role** - *Required* - The role to add
> * **alias** - An alias or alternative name for the role for use in the panel dropdown
>
> ---
> #### **/panel removerole** *{role}*
> Removes a role from an existing panel.
> ##### Args
> * **role** - *Required* - The role to remove
>
> ---
> #### **/panel list** *[name]*
> Either lists all panels in your guild, or all roles in a panel.
> ##### Args
> * **name** - Name of an existing panel

---
### **/ping**
Basic command which causes the bot to simply respond with "Pong!".

---
### **/prune** *{days}*
Prunes inactive members based on how many days they've been inactive. CANNOT be used in DMs.
#### Args
* **days** - *Required* - Days of inactivity to kick users by. Has to be a number between 1 - 30

---
### **/purge** *{n} [target]*
Deletes posts in whatever channel it is used in by most recent to least recent. API restrictions limit it to posts that are no older than 14 days. CANNOT be used in DMs.
#### Args
* **n** - *Required* - Number of posts to delete. Has to be a number between 1 - 100.
* **target** - Specify a user to delete only posts made by them.

---
### **/roll** *{type} [n, bonuses]*
Rolls some dice.
#### Args
* **type** - *Required* - (`d4`, `d6`, `d8`, `d10`, `d12`, `d20`, `d100`) - The type of die to roll (number of faces for dice).
* **n** - The number of dice to roll. Limited to 1 - 100. Defaults to 1.
* **bonuses** - A modifier to add on to your result. Limited to -1,000,000 - 1,000,000. Defaults to 0.

---
### **/whois** *{target}*
Provides an embed with various details about a specific user. CANNOT be used in DMs.
#### Args
* **target** - *Required* - User to lookup.
