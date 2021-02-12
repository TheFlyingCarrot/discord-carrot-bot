import { ClientModules, Config, Discord, EventHandlers, ExtendedClient } from './internal'

// Set-up
export const client = new ExtendedClient(`${Config.default_commands_enabled ? `${Config.prefix}help` : 'nobody.'}`, { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = ClientModules.initalizeCommands()
client.login(process.env.BOT_TOKEN)

// Events
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
