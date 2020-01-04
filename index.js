// Discord Initialization
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

// Module Initialization
const fs = require('fs')
const { defaultPrefix } = require('./config.json')
const readGuildData = require('./extra/readGuildData.js')
const setGuildData = require('./extra/setGuildData.js')
const commandFiles = fs.readdirSync('./command_modules').filter(file => file.endsWith('.js'))
const developers = fs.readFileSync('./extra/developers.txt')
const packageInfo = JSON.parse(fs.readFileSync('./package.json'))

// Command Palette Set-up
for (const file of commandFiles) {
	const command = require(`./command_modules/${file}`)
	client.commands.set(command.name, command)
}

// Independent Items
const INDEX_DEBUG = false

// Embed
// eslint-disable-next-line no-unused-vars
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#ff9b00')
	.setAuthor('Carrot Bot', 'https://cdn.discordapp.com/avatars/442956645845303296/dc8d6f257a3cb52773a7bf5f59ec8cc5.png?size=128')
	.addField('Title', 'Body')
	.setFooter('Object#3918', 'https://cdn.discordapp.com/avatars/238880608971915264/b1a6df2e17cfec849ac6b07da5706a47.png?size=128')
	.setTimestamp()

// Triggers when the client (bot) is ready.
client.once('ready', () => {
	// eslint-disable-next-line no-unused-vars
	const guilds = new Map(client.guilds)
		.forEach(guild => {
			const guildFile = readGuildData.read(guild)
			console.log(guildFile[0], guildFile[1])
			if (!guildFile[0]) {
				console.log(`No file for guild: ${guild.name}`)
				setGuildData.write(guild)
					.catch(console.error)
			}
			const channel = guild.channels.find(ch => ch.name === 'general' && ch.type == 'text')
			if ((channel) && (packageInfo.version)) {
				channel.send(
					new Discord.MessageEmbed()
						.setColor('#ff9b00')
						.setAuthor('Carrot Bot', 'https://cdn.discordapp.com/avatars/442956645845303296/dc8d6f257a3cb52773a7bf5f59ec8cc5.png?size=128')
						.addField('Title', 'Body')
						.setFooter('Object#3918', 'https://cdn.discordapp.com/avatars/238880608971915264/b1a6df2e17cfec849ac6b07da5706a47.png?size=128')
						.setTimestamp()
						.setTitle('Service Restart')
						.addfield('Reason', `Hello, I was just updated! New version: ${packageInfo.version}.`),
				)
			}
		})
	console.log('Bot Client State: Ready')
})

// Triggers when a connection to Discord API has been found and is attempting to reconnect.
client.once('reconnecting', () => {
	console.log('Bot Client State: Reconnecting')
})

// Triggers when the connection to Discord API is interrupted.
client.once('disconnect', () => {
	console.log('Bot Client State: Disconnected')
})

// Triggers when the bot (client) connects to a new server.
client.on('guildCreate', guildObj => {
	console.log('Bot was added to a new guild: ' + guildObj.name)
	// eslint-disable-next-line no-unused-vars
	const guilds = client.guilds.map(g => g)
		.forEach(guild => {
			if (!fs.existsSync(`./guilds/${guild.id}.json`)) {
				console.log(`No Guild ID File Found for Guild ID: ${guild.id}`)
				const guildData = { id: `${guild.id}`, name: `${guild.name}`, adminRoleID: NaN, modRoleID: NaN }
				fs.writeFileSync(`./guilds/${guild.id}.json`, JSON.stringify(guildData), 'utf-8')
			}
		})
})

// Triggers when the bot (client) is removed from a server.
client.on('guildDelete', guildObj => {
	console.log('Bot was removed from a guild: ' + guildObj.name)
	// eslint-disable-next-line no-unused-vars
	const guilds = client.guilds.map(g => g)
		.forEach(guild => {
			if (fs.existsSync(`./guilds/${guild.id}.json`)) {
				fs.unlinkSync(`./guilds/${guild.id}.json`)
					.catch(console.error)
			}
		})
})

// Triggers when a new member is added in any guild.
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'general' && ch.type == 'text')
	if (channel) {
		channel.send(`Welcome to the server, ${member}!`)
	}
})

// Triggers when a new member is removed from any guild.
client.on('guildMemberRemove', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'general' && ch.type == 'text')
	if (channel) {
		channel.send(`Good-bye, ${member}.`)
	}
})

// Triggers when any new message is recieved by the bot (client).
client.on('message', message => {
	if ((!message.content.startsWith(defaultPrefix)) || message.author.bot || message.tts || message.system) {
		return null
	}
	const args = message.content.slice(defaultPrefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	// Start Command Verification
	try {
		// Not a command.
		if (!command) {
			return null
		}
		// Developer-Only Command.
		if (command.developerOnly) {
			const developerFile = ('./extra/developers.txt')
			if (!fs.existsSync(developerFile)) {
				message.reply('there was an error in finding the developers.')
				return null
			} else if (!developers.includes(message.author.id)) {
				message.reply('that is a developer-only command. Sorry!')
				return null
			}
		}
		// Guild/Server-Only Command.
		if (command.guildOnly && (message.channel.type !== 'text')) {
			message.reply('I can\'t execute that command inside Direct Messages.')
			return null
		}
		// Check for the required permissions.
		if (command.permission && (!message.guild.me.hasPermission(command.permission))) {
			message.reply(`I need the ${command.permission} permission to execute that command.`)
			return null
		}
		// Check for arguments. If none exist, reply with reason and provide usage, if it exists.
		if (command.args && !args.length) {
			let reply = 'that command requires arguments.'
			if (command.usage) {
				reply += (`\nThe proper usage is: \`${defaultPrefix}${command.name} ${command.usage}\``)
			}
			message.reply(reply)
				.catch(console.error)
			return null
		}
		// Adds commands to the cooldowns collection.
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection())
		}
		// END Command Verification
		// Error Catch
	} catch (err) {
		console.log(err)
		message.reply('there was an error in recognizing that command.')
		return null
	} finally {
		// START Debug Log
		if (INDEX_DEBUG == true) {
			let logMessage = (`*new message with prefix recognized
---- message recognized
---------- message.content:         ${message.content}
---------- message.author.tag:      ${message.author.tag}
---------- message.author.id:       ${message.author.id}
---------- message.channel:         ${message.channel}
---------- message.channel.type:    ${message.channel.type}
---------- message.createdAt:       ${message.createdAt}`)
			if (message.guild !== null) {
				logMessage += (`
---- guild recognized
---------- message.guild:           ${message.guild}
---------- message.guild.id:        ${message.guild.id}`)
			}
			if (command) {
				logMessage += (`
---- command recognized
---------- command.name:            ${command.name}`)
				if (args) {
					logMessage += (`
---------- args:                    ${args}`)
				}
			}
			console.log(logMessage)
		}
	}
	// END Debug Log

	// START Cooldowns  *COOLDOWNS
	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 3) * 1000

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if ((now < expirationTime) && (message.author.id !== '238880608971915264')) {
			const timeLeft = (expirationTime - now) / 1000
			message.reply(`please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${command.name}\` command.`)
			return null
		}
	} else if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now)
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	}
	// END Cooldowns

	// START Execute Command
	try {
		command.execute(message, args)
		console.log(`TIMESTAMP[${message.createdTimestamp}] A_ID[${message.author.id}] A_NAME[${message.author.username}] CMD_NAME[${commandName}] CMD_ARGS[${args}].`)
	} catch (err) {
		console.log(err)
		message.reply('there was an error trying to execute that command.')
		return null
	}
	// END Execute Command
})

client.login()