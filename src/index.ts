import { Command, Config, Discord, EventHandlers, ExtendedClient, fs } from './internal'

// Client Set-up
export const client: ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()
client.commandsEnabled = Config.default_commands_enabled
client.activity = client.commandsEnabled ? '.help' : 'nobody.'
client.events = Config.client_events
client.login(process.env.BOT_TOKEN)

// Commands
for (const file of fs.readdirSync(`${__dirname}/command_modules/`)) {
	if (!file.endsWith('.js')) continue
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const command: Command = require(`./command_modules/${file}`).default
	try {
		client.commands.set(command.name, command)
	} catch (error) {
		console.error('[Command Loading Error]', `${file}: Command: ${command && command.name ? `'${command.name}'` : '\'Unknown\''} could not be loaded.\nError: ${error}`)
	}
}

// Client Events
client
	.on('ready', EventHandlers.onReady)
	.on('debug', console.debug)
	.on('warn', console.warn)
	.on('error', console.error)
	.on('invalidated', console.error)
	.on('disconnect', console.error)
	.on('guildBanAdd', EventHandlers.onGuildBanAdd)
	.on('guildBanRemove', EventHandlers.onGuildBanRemove)
	.on('guildMemberRemove', EventHandlers.onGuildMemberRemove)
	.on('messageDelete', EventHandlers.onMessageDeletion)
	.on('messageReactionAdd', EventHandlers.onMessageReactionAdd)
	.on('messageReactionRemove', EventHandlers.onMessageReactionRemove)
	.on('messageUpdate', EventHandlers.onMessageUpdate)
	.on('message', EventHandlers.onMessage)
	.on('webhookUpdate', EventHandlers.onWebhookUpdate)
