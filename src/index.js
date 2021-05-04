import { config, ExtendedClient, generateCommands, generateSlashCommands, eventHandlers } from './internal'

// Set-up
export const client = new ExtendedClient(config.default_commands_enabled ? `${config.prefix}help` : 'nobody.', { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = generateCommands()
client.slash_commands = generateSlashCommands()
client.login(process.env.BOT_TOKEN)

client
	.on('warn', console.warn)
	.on('error', console.error)
	.on('invalidated', console.warn)
	.on('disconnect', console.warn)
	.on('ready', eventHandlers.onReady)
	.on('guildBanAdd', eventHandlers.onGuildBanAdd)
	.on('guildBanRemove', eventHandlers.onGuildBanRemove)
	.on('guildMemberRemove', eventHandlers.onGuildMemberRemove)
	.on('message', eventHandlers.onMessage)
	.on('messageUpdate', eventHandlers.onMessageUpdate)
	.on('messageDelete', eventHandlers.onMessageDeletion)
	.on('messageReactionAdd', eventHandlers.onMessageReactionAdd)
	.on('messageReactionRemove', eventHandlers.onMessageReactionRemove)
	.on('webhookUpdate', eventHandlers.onWebhookUpdate)
	.ws.on('INTERACTION_CREATE', eventHandlers.onInteractionCreate)
