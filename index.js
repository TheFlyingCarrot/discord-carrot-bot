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
// eslint-disable-next-line no-unused-vars
const packageInfo = JSON.parse(fs.readFileSync('./package.json'))

// Command Palette Set-up
for (const file of commandFiles) {
	const command = require(`./command_modules/${file}`)
	client.commands.set(command.name, command)
}

// Independent Items
const INDEX_DEBUG = false
// eslint-disable-next-line no-unused-vars
let guilds = new Map()

// Embed
const exampleEmbed = new Discord.RichEmbed()
	.setColor('#ff9b00')
	.setFooter('Creator: Object#3918', 'https://cdn.discordapp.com/avatars/238880608971915264/b1a6df2e17cfec849ac6b07da5706a47.png?size=128')
	.setTimestamp()

// Triggers when the client (bot) is ready.
client.once('ready', () => {
	guilds = new Map(client.guilds)
		.forEach(guild => {
			const guildFile = readGuildData.read(guild)
			console.log(guildFile[0], guildFile[1])
			if (!guildFile[0]) {
				console.log(`No file for guild: ${guild.name}`)
				setGuildData.write(guild)
					.catch(console.error)
			}
			/* const channel = guild.channels.find(ch => ch.name === 'general' && ch.type == 'text')
			if ((channel) && (packageInfo.version)) {
				const newEmbed = exampleEmbed
					.setTitle('Service Restart')
					.setDescription(`Hello, I was just updated! New version: ${packageInfo.version}.`)
				channel.send(newEmbed)
			} */
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
	guilds = client.guilds.map(g => g)
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
	guilds = client.guilds.map(g => g)
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
				const newEmbed = exampleEmbed
					.setTitle('Command Error')
					.setDescription('There was an error in finding the developers.')
				message.channel.send(newEmbed)
				return null
			} else if (!developers.includes(message.author.id)) {
				const newEmbed = exampleEmbed
					.setTitle('Command Error')
					.setDescription('That is a developer-only command. Sorry!')
				message.channel.send(newEmbed)
				return null
			}
		}
		// Guild/Server-Only Command.
		if (command.guildOnly && (message.channel.type !== 'text')) {
			const newEmbed = exampleEmbed
				.setTitle('Command Error')
				.setDescription('I can\'t execute that command inside Direct Messages.')
			message.channel.send(newEmbed)
			return null
		}
		// Check for the required permissions.
		if (command.permission && (!message.guild.me.hasPermission(command.permission))) {
			const newEmbed = exampleEmbed
				.setTitle('Command Error')
				.setDescription(`I need the ${command.permission} permission to execute that command.`)
			message.channel.send(newEmbed)
			return null
		}
		// Check for arguments. If none exist, reply with reason and provide usage, if it exists.
		if (command.args && !args.length) {
			let reply = 'That command requires arguments.'
			if (command.usage) {
				reply += (`\nThe proper usage is: \`${defaultPrefix}${command.name} ${command.usage}\``)
			}
			const newEmbed = exampleEmbed
				.setTitle('Command Error')
				.setDescription(reply)
			message.channel.send(newEmbed)
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
		const newEmbed = exampleEmbed
			.setTitle('Command Error')
			.setDescription('There was an error in recognizing that command.')
		message.channel.send(newEmbed)
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
			const newEmbed = exampleEmbed
				.setTitle('Command Cooldown')
				.setDescription(`Please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${command.name}\` command.`)
			message.channel.send(newEmbed)
			return null
		}
	} else if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now)
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	}
	// END Cooldowns

	// START Execute Command
	const newEmbed = exampleEmbed
	try {
		let returns = null
		returns = command.execute(message, args)
		if ((returns) && (returns.title) && (returns.body)) {
			newEmbed
				.setTitle(returns.title)
				.setDescription(returns.body)
			message.channel.send(newEmbed)
		}
	} catch (err) {
		console.log(err)
		newEmbed
			.setTitle('Command Error')
			.setDescription(`There was an error trying to execute that command. ${err}`)
		message.channel.send(newEmbed)
	}
	// END Execute Command
})

client.login()
