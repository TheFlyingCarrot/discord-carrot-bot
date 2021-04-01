import { config, EventHandlers, ExtendedClient, generateCommands, generateSlashCommands } from './internal'

// Set-up
export const client = new ExtendedClient(config.default_commands_enabled ? `${config.prefix}help` : 'nobody.', { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = generateCommands()
client.slash_commands = generateSlashCommands()
client.login(process.env.BOT_TOKEN)

client
	.on('debug', console.debug)
	.on('warn', console.warn)
	.on('error', console.error)
	.on('invalidated', console.error)
	.on('disconnect', console.error)
	.on('ready', EventHandlers.onReady)
	.on('guildBanAdd', EventHandlers.onGuildBanAdd)
	.on('guildBanRemove', EventHandlers.onGuildBanRemove)
	.on('guildMemberRemove', EventHandlers.onGuildMemberRemove)
	.on('message', EventHandlers.onMessage)
	.on('messageUpdate', EventHandlers.onMessageUpdate)
	.on('messageDelete', EventHandlers.onMessageDeletion)
	.on('messageReactionAdd', EventHandlers.onMessageReactionAdd)
	.on('messageReactionRemove', EventHandlers.onMessageReactionRemove)
	.on('webhookUpdate', EventHandlers.onWebhookUpdate)
	.ws.on('INTERACTION_CREATE', EventHandlers.onInteractionCreate)
