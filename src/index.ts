import { Command, Config, Discord, ExtendedClient, fs, getCommand, handleGuildBanAdd, handleGuildBanRemove, handleGuildMemberRemove, handleMessageDeletion, handleMessageReactionAdd, handleMessageReactionRemove, handleMessageUpdate, handleWebhookUpdate } from './internal'

// Client Set-up
const client: ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
client.commandsEnabled = true
client.activity = '.help'
client.events = Config.client_events
const cooldowns = new Discord.Collection()

// Commands
for (const file of fs.readdirSync(`${__dirname}/command_modules/`)) {
	if (!file.endsWith('.js')) continue
	const command: Command = require(`./command_modules/${file}`).default
	try {
		client.commands.set(command.name, command)
	} catch (error) {
		console.error('[Command] [Load] [Fail]', `${file}: Command: ${command && command.name ? `'${command.name}'` : '\'Unknown\''} could not be loaded. Error: ${error}`)
	}
}

// Client Events
client
	.on('ready', () => {
		console.debug('[Client] [State] Ready')
		client.commandsEnabled ? client.user.setStatus('online') : client.user.setStatus('dnd')
		setInterval(() => {
			client.user.setActivity(client.activity, { type: 'LISTENING' })
				.catch(console.error)
		}, 600000)
	})
	.on('debug', console.debug)
	.on('warn', console.warn)
	.on('error', console.error)
	.on('invalidated', console.error)
	.on('disconnect', console.error)
	.on('message', async (message: Discord.Message) => {
		if (client.events.message === false) return
		// nullish coalescing operator: ??
		const { command, args } = getCommand({ client, message, prefix: Config.prefix, developers: Config.developers, cooldowns }) || {}
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
	.on('messageReactionAdd', handleMessageReactionAdd)
	.on('messageReactionRemove', handleMessageReactionRemove)
	.on('guildMemberRemove', handleGuildMemberRemove)
	.on('guildBanAdd', handleGuildBanAdd)
	.on('guildBanRemove', handleGuildBanRemove)
	.on('webhookUpdate', handleWebhookUpdate)

export { client }

