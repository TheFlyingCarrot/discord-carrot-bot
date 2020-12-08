import { Command, ExtendedClient } from './typings'
import filesys from 'fs'
import Discord, { Activity, Presence } from 'discord.js'
import { handleMessageReaction } from './handlers/messageReaction_Handler'
import { handleMessageDeletion } from './handlers/messageDelete_Handler'
import { getCommand } from './handlers/command_Handler'
import { developers, prefix } from './config.json'
import { handleGuildMemberRemove } from './handlers/guildMemberRemove_Handler'
import { handleGuildBanAdd } from './handlers/guildBanAdd_Handler'
import { handleGuildBanRemove } from './handlers/guildBanRemove_Handler'
import { handleMessageUpdate } from './handlers/messageUpdate_Handler'

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
	.on('message', (message: Discord.Message) => {
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
	.on('messageUpdate', async (oldMessage: Discord.Message, newMessage: Discord.Message) => handleMessageUpdate(oldMessage, newMessage))
	.on('messageDelete', (message: Discord.Message) => handleMessageDeletion(message))
	.on('messageReactionAdd', async (reaction: Discord.MessageReaction, user: Discord.User) => handleMessageReaction(client, reaction, user, 'add'))
	.on('messageReactionRemove', async (reaction: Discord.MessageReaction, user: Discord.User) => handleMessageReaction(client, reaction, user, 'remove'))
	.on('guildMemberRemove', (member: Discord.GuildMember) => handleGuildMemberRemove(member))
	.on('guildBanAdd', (guild: Discord.Guild, user: Discord.User) => handleGuildBanAdd(guild, user))
	.on('guildBanRemove', (guild: Discord.Guild, user: Discord.User) => handleGuildBanRemove(guild, user))