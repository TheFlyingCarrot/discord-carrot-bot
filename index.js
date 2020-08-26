// Pre-Initalization
const fs = require('fs')
const Discord = require('discord.js')
const { prefix, developers } = require('./helper_modules/config.json')
const debug_logger = require('./helper_modules/debug_logger')

// Discord Initialization
const client = new Discord.Client()
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

// Command Palette
for (const file of fs.readdirSync('./command_modules')) {
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
client.on('guildCreate', guildObject => {
	console.log(`Bot Added To Guild: ${guildObject.name}`)
})

// Triggers when the bot (client) is removed from a server.
client.on('guildDelete', guildObject => {
	console.log(`Bot Removed From Guild: ${guildObject.name}`)
})

// Triggers when a new member is added in any guild.
// Currently not working.
/* client.on('guildMemberAdd', member => {
	return null
}) */

// Triggers when a new member is removed from any guild.
// Currently not working.
/* client.on('guildMemberRemove', member => {
	return null
}) */

// Triggers when any new message is recieved by the bot (client).
client.on('message', message => {
	// Start Command Verification
	if ((!message.content.startsWith(prefix)) || message.author.bot || message.tts || message.system) {
		return null
	}
	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	try {
		// Command Validity Check
		if (!command) {
			return null
		}
		// Developer Command Check
		if ((command.developerOnly) && (!developers.includes(`${message.author.id}`))) {
			message.channel.send(`${message.author}, that command can only be used by developers. Sorry!`)
			return null
		}
		// Guild-Only Command Check
		if ((command.guildOnly) && (message.channel.type !== 'text')) {
			message.channel.send(`${message.author}, that command is reserved for servers only. Sorry!`)
			return null
		}
		// Toggled Check / Enabled Check
		if (!command.enabled) {
			message.channel.send(`${message.author}, ${command.name} is currently \`disabled\`. Sorry!`)
			return null
		}
		// Permissions Check
		if ((command.permission) && (!message.guild.me.hasPermission(command.permission))) {
			message.channel.send(`${message.author}, I lack the \`${command.permission}\` permission to execute that command.`)
			return null
		}
		// Arguments Check
		if ((command.args) && (!args.length)) {
			message.channel.send(`${message.author}, that command requires arguments.${command.usage ? `\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\`` : null}`)
			return null
		}
		// Command Cooling
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection())
		}
	} catch (err) {
		console.log(err)
		message.channel.send(`${message.author}, \`${command.name}\` caused an internal error and has been cancelled.`)
		return null
	} finally { if (debug_logger.enabled) { debug_logger.execute({ message, command, args, developers }) } }
	// End Command Verification

	// Start Cooldown Handler
	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 3) * 1000

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			message.channel.send(`${message.author}, you cannot use that command for another \`${timeLeft.toFixed(1)}\` ${timeLeft.toFixed(1) !== 1.0 ? 'seconds' : 'second'}.`)
			return null
		}
	} else if (!timestamps.has(message.author.id) && !developers.includes(message.author.id)) {
		timestamps.set(message.author.id, now)
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	}
	// End Cooldown Handler

	// START Execute Command
	try {
		const returns = command.execute({ client, message, args, templateEmbed: new Discord.MessageEmbed() })
		if (returns) { console.log(returns) }
	} catch (err) {
		console.log(err)
		message.channel.send(`${message.author}, \`${command.name}\` produced an unknown error.`)
	}
	// END Execute Command
})

process.on('uncaughtException', (err) => console.log(err))