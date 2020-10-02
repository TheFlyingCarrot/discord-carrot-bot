const filesys = require('fs')
const Discord = require('discord.js')

// Discord Initialization
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

// Command Palette Setup
for (const file of filesys.readdirSync(`${__dirname}\/command_modules\/`)) {
  const command:Command = require(`./command_modules/${file}`).default
  if (command) {
    console.log(`./command_modules/${file}: ${command.name}: ${command}`)
    client.commands.set(command.name, command)
  }
}

// Debug
let Debugging = true

// Triggers when the client (bot) is ready.
client.once('ready', () => {
	console.log('Bot Client State: Ready')
})

// Triggers when any message in any guild has a reaction added to it.
client.on('messageReactionAdd', async (reaction: { partial: any; fetch: () => any }, user: any) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error)
			return null
		}
	}

	handle_reaction(client, reaction, user)
})

// Triggers when any new message is recieved by the bot (client).
client.on('message', (message) => {
	// Command Validation
	const { command, args } = validate_command({ client, message, prefix, developers, cooldowns, Discord })
	if (Debugging) debug_log({ message, command, args, developers })
	if (!command) return null

	// Cooldown Handling
	if (!handle_cooldown({ message, command, cooldowns, developers })) return null

	// Command Execution
	try {
		const command_execution_logs = command.execute({ client, message, args, Debugging })
		if (command_execution_logs) console.error(command_execution_logs)
	} catch (err) {
		console.error(err)
		message.channel.send(`${message.author}, \`${command.name}\` produced an unknown error.`)
	}
})

process.on('uncaughtException', (err) => console.log(err))
