const INDEX_DEBUG = false

// Discord Initialization
const Discord = require('discord.js')
const client = new Discord.Client()
client.login(process.env.BOT_TOKEN)

const templateEmbed = new Discord.MessageEmbed()
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()


// Module Pre-Initalization
const fs = require('fs')

// Module Initialization
const { prefix } = require('./config.json')
const developers = fs.readFileSync('./helper_modules/developers.txt')

// Command Palette Set-up
const commandFiles = fs.readdirSync('./command_modules').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./command_modules/${file}`)
	client.commands.set(command.name, command)
}

// Triggers when the client (bot) is ready.
client.once('ready', () => {
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
})

// Triggers when the bot (client) is removed from a server.
client.on('guildDelete', guildObj => {
	console.log('Bot was removed from a guild: ' + guildObj.name)
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
	if ((!message.content.startsWith(prefix)) || message.author.bot || message.tts || message.system) {
		return null
	}
	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	// START Command Verification
	try {
		// Not a command.
		// eslint-disable-next-line no-inline-comments
		if (!command) {
			return null
		}
		if (!command.enabled) {
			const newEmbed = templateEmbed
				.setTitle('Command Error')
				.setThumbnail('https://i.ibb.co/GvWjZyY/admin-alert.png')
				.setTimestamp()
				.setDescription('That command is currently disabled. Sorry!')
			message.channel.send(newEmbed)
			return null
		}
		// Developer-Only Command.
		if (command.developerOnly) {
			if (!developers) {
				const newEmbed = templateEmbed
					.setTitle('Command Error')
					.setThumbnail('https://i.ibb.co/GvWjZyY/admin-alert.png')
					.setTimestamp()
					.setDescription('There was an error in finding the developers.')
				message.channel.send(newEmbed)
				return null
			} else if (!developers.includes(message.author.id)) {
				const newEmbed = templateEmbed
					.setTitle('Command Error')
					.setThumbnail('https://i.ibb.co/GvWjZyY/admin-alert.png')
					.setTimestamp()
					.setDescription('That is a developer-only command. Sorry!')
				message.channel.send(newEmbed)
				return null
			}
		}
		// Guild/Server-Only Command.
		if (command.guildOnly && (message.channel.type !== 'text')) {
			const newEmbed = templateEmbed
				.setTitle('Command Error')
				.setThumbnail('https://i.ibb.co/GvWjZyY/admin-alert.png')
				.setTimestamp()
				.setDescription('I can\'t execute that command inside Direct Messages.')
			message.channel.send(newEmbed)
			return null
		}
		// Check for the required permissions.
		if (command.permission && (!message.guild.me.hasPermission(command.permission))) {
			const newEmbed = templateEmbed
				.setTitle('Command Error')
				.setThumbnail('https://i.ibb.co/GvWjZyY/admin-alert.png')
				.setTimestamp()
				.setDescription(`I need the ${command.permission} permission to execute that command.`)
			message.channel.send(newEmbed)
			return null
		}
		// Check for arguments. If none exist, reply with reason and provide usage, if it exists.
		if (command.args && !args.length) {
			let reply = 'That command requires arguments.'
			if (command.usage) {
				reply += (`\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\``)
			}
			const newEmbed = templateEmbed
				.setTitle('Command Error')
				.setThumbnail('https://i.ibb.co/GvWjZyY/admin-alert.png')
				.setTimestamp()
				.setDescription(reply)
			message.channel.send(newEmbed)
			return null
		}
		// Adds commands to the cooldowns collection.
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection())
		}
	} catch (err) {
		console.log(err)
		const newEmbed = templateEmbed
			.setTitle('Command Error')
			.setThumbnail('https://i.ibb.co/GvWjZyY/admin-alert.png')
			.setTimestamp()
			.setDescription('There was an error in executing that command.')
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
				if (args.length > 0) {
					logMessage += (`
---------- args:                    ${args}`)
				}
			}
			console.log(logMessage)
		}
	}
	// END Debug Log / END Command Verification

	// START Cooldowns *COOLDOWNS
	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 3) * 1000

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if ((now < expirationTime) && (message.author.id !== '238880608971915264')) {
			const timeLeft = (expirationTime - now) / 1000
			const newEmbed = templateEmbed
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
	try {
		const returns = command.execute({
			client,
			message,
			args,
			templateEmbed: new Discord.MessageEmbed(),
		})
		if (returns) {
			console.log(returns)
		}
	} catch (err) {
		console.log(err)
		const newEmbed = templateEmbed
			.setTitle('Command Error')
			.setThumbnail('https://i.ibb.co/GvWjZyY/admin-alert.png')
			.setTimestamp()
			.setDescription(`There was an error trying to execute that command. ${err}`)
		message.channel.send(newEmbed)
	}
	// END Execute Command
})

process.on('uncaughtException', (err) => console.log(err))

client.login()