import { Command, Config, Discord, ExtendedClient, fs, handleGuildBanAdd, handleGuildBanRemove, handleGuildMemberRemove, handleMessage, handleMessageDeletion, handleMessageReactionAdd, handleMessageReactionRemove, handleMessageUpdate, handleWebhookUpdate, onReady } from './internal'

// Client Set-up
export const client: ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()
client.commandsEnabled = true
client.activity = '.help'
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
	.on('ready', onReady)
	.on('debug', console.debug)
	.on('warn', console.warn)
	.on('error', console.error)
	.on('invalidated', console.error)
	.on('disconnect', console.error)
	.on('guildBanAdd', handleGuildBanAdd)
	.on('guildBanRemove', handleGuildBanRemove)
	.on('guildMemberRemove', handleGuildMemberRemove)
	.on('messageDelete', handleMessageDeletion)
	.on('messageReactionAdd', handleMessageReactionAdd)
	.on('messageReactionRemove', handleMessageReactionRemove)
	.on('messageUpdate', handleMessageUpdate)
	.on('message', handleMessage)
	.on('webhookUpdate', handleWebhookUpdate)
