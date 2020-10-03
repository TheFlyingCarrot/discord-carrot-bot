import filesys from 'fs'
import Discord, { Message, MessageEmbed} from 'discord.js'
import { APIUser } from 'discord-api-types/v6'
import { prefix, developers } from './config.json'

import { validate_command } from './helper_modules/command_validator'
import { debug_log } from './helper_modules/debug_logger'
import { handle_cooldown } from './helper_modules/cooldown_handler'
import { handle_reaction } from './helper_modules/reaction_handler'
import { ExtendedClient } from './typings'

// Discord Initialization
const client:ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

// Command Palette Setup
for (const file of filesys.readdirSync(`${__dirname}\/command_modules\/`)) {
  const command: Command = require(`./command_modules/${file}`).default
  try {
    if (file != 'hoists.js') {
      client.commands.set(command.name, command)
      console.log(`${file}: Command: ${command && command.name ? `'${command.name.replace(/^\w/, c => c.toUpperCase())}'` : '\'Unknown\''} set.`)
    }
  } catch (error) {
    console.error(`${file}: Command: ${command && command.name ? `'${command.name.replace(/^\w/, c => c.toUpperCase())}'` : '\'Unknown\''} could not be loaded. Error: ${error}`)
  }
}

// Debug
client.debugging = false
console.log(`Debugging: ${client.debugging.toString().replace(/^\w/, c => c.toUpperCase())}`)

// Triggers when the client (bot) is ready.
client.once('ready', () => {
	console.log('Bot Client State: Ready')
})

// Triggers when any message in any guild has a reaction added to it.
client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			console.log('Something went wrong when fetching the message reaction: ', error)
			return null
		}
	}
  console.log(typeof reaction.emoji.id)
	handle_reaction(client, reaction, user)
})

// Triggers when any new message is recieved by the bot (client).
client.on('message', async (message: Discord.Message) => {
  // Command Validation
  const commandArray = { client, message, prefix, developers, cooldowns }
  const { command, args } = validate_command(commandArray)
	if (client.debugging) debug_log({ message, command, args, developers })
	if (!command) return null

	// Cooldown Handling
	if (!handle_cooldown({ message, command, cooldowns, developers })) return null

	// Command Execution
	try {
		const command_execution_logs = await command.execute({ client, message, args }, client.debugging)
		if (command_execution_logs) console.error(command_execution_logs)
	} catch (error) {
		message.channel.send(`${message.author}, \`${command.name}\` produced an unknown error.`)
		console.error(error)
	}
})

process.on('uncaughtException', (err) => console.log(err))
