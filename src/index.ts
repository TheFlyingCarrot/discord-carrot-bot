import { Command, Config, Discord, EventHandlers, ExtendedClient, fs, HelperModules } from './internal'

// Client Set-up
export const client: ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()
client.commandsEnabled = Config.default_commands_enabled
client.activity = client.commandsEnabled ? '.help' : 'nobody.'
client.events = Config.client_events

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
	.on('ready', HelperModules.onReady)
	.on('debug', console.debug)
	.on('warn', console.warn)
	.on('error', console.error)
	.on('invalidated', console.error)
	.on('disconnect', console.error)
	.on('guildBanAdd', EventHandlers.handleGuildBanAdd)
	.on('guildBanRemove', EventHandlers.handleGuildBanRemove)
	.on('guildMemberRemove', EventHandlers.handleGuildMemberRemove)
	.on('messageDelete', EventHandlers.handleMessageDeletion)
	.on('messageReactionAdd', EventHandlers.handleMessageReactionAdd)
	.on('messageReactionRemove', EventHandlers.handleMessageReactionRemove)
	.on('messageUpdate', EventHandlers.handleMessageUpdate)
	.on('message', EventHandlers.handleMessage)
	.on('webhookUpdate', EventHandlers.handleWebhookUpdate)
