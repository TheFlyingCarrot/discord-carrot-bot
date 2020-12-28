import { Config, EventHandlers, ExtendedClient } from './internal'

// Set-up
export const client: ExtendedClient = new ExtendedClient(`${Config.default_commands_enabled ? `${Config.prefix}help` : 'nobody.'}`, { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)

// Events
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
