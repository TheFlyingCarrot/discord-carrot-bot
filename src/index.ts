import filesys from 'fs'
import Discord from 'discord.js'
import { Command, ExtendedClient } from './typings'

import { getCommand } from './helper_modules/getCommand'
import { developers, prefix } from './config.json'

import { handleMessageReaction } from './event_handlers/messageReaction_Handler'
import { handleMessageDeletion } from './event_handlers/messageDelete_Handler'
import { handleGuildMemberRemove } from './event_handlers/guildMemberRemove_Handler'
import { handleGuildBanAdd } from './event_handlers/guildBanAdd_Handler'
import { handleGuildBanRemove } from './event_handlers/guildBanRemove_Handler'
import { handleMessageUpdate } from './event_handlers/messageUpdate_Handler'
import { handleWebhookUpdate } from './event_handlers/webhookUpdate_Handler'

// Client Set-up
const client: ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
client.shackled = false
const cooldowns = new Discord.Collection()

// Commands
for (const file of filesys.readdirSync(`${__dirname}/command_modules/`)) {
	const command: Command = require(`./command_modules/${file}`).default
	try {
		client.commands.set(command.name, command)
	} catch (error) {
		console.error('[Command] [Load] [Fail]', `${file}: Command: ${command && command.name ? `'${command.name}'` : '\'Unknown\''} could not be loaded. Error: ${error}`)
	}
}

client
	.on('ready', () => {
		console.debug('[Client] [State] Ready')
		client.user.setStatus('online')
		setInterval(() => {
			client.user.setActivity('.help', { type: 'LISTENING' })
				.catch(console.error)
		}, 600000)
	})
	.on('debug', console.debug)
	.on('warn', console.warn)
	.on('error', console.error)
	.on('invalidated', console.error)
	.on('disconnect', console.error)
	.on('message', async (message: Discord.Message) => {
		// Get command from provided args, or a empty object | future: declare an empty object instead of a null object (nullish coalescing operator: ??)

		const { command, args } = getCommand({ client, message, prefix, developers, cooldowns }) || {}

		if (command) {
			message.channel.startTyping()

			try {
				command.execute({ client, message, args })
			} catch (error) {
				console.error(error)
			}

			message.channel.stopTyping()
		}

	})
	.on('messageUpdate', handleMessageUpdate)
	.on('messageDelete', handleMessageDeletion)
	.on('messageReactionAdd', async (reaction: Discord.MessageReaction, user: Discord.User) => handleMessageReaction(client, reaction, user, 'messageReactionAdd'))
	.on('messageReactionRemove', async (reaction: Discord.MessageReaction, user: Discord.User) => handleMessageReaction(client, reaction, user, 'messageReactionRemove'))
	.on('guildMemberRemove', handleGuildMemberRemove)
	.on('guildBanAdd', handleGuildBanAdd)
	.on('guildBanRemove', handleGuildBanRemove)
	.on('webhookUpdate', handleWebhookUpdate)
