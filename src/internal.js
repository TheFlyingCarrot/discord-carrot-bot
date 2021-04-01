export * as DiscordJS from 'discord.js'
export { APIUser } from 'discord-api-types/v8'
export * as fs from 'fs'
export { fetch } from 'node-fetch'
export * as path from 'path'
export { default as ExtendedClient } from './client_modules/ExtendedClient'
export { generateCommands } from './client_modules/generateCommands'
export { generateSlashCommands } from './client_modules/generateSlashCommands'
export { getCommand } from './client_modules/getCommand'
export { getSlashCommand } from './client_modules/getSlashCommand'
export { parseCommandFromMessage } from './client_modules/parseCommandFromMessage'
export { config } from './config'
export { cooldown } from './helper_modules/cooldown'
export { createRole } from './helper_modules/createRole'
export { fetchPartial } from './helper_modules/fetchPartial'
export { isValidCommand } from './helper_modules/isValidCommand'
export { isValidReaction } from './helper_modules/isValidReaction'
export { client } from './index'

import { onGuildBanAdd } from './handlers/onGuildBanAdd'
import { onGuildBanRemove } from './handlers/onGuildBanRemove'
import { onGuildMemberRemove } from './handlers/onGuildMemberRemove'
import { onInteractionCreate } from './handlers/onInteractionCreate'
import { onMessage } from './handlers/onMessage'
import { onMessageDeletion } from './handlers/onMessageDelete'
import { onMessageReactionAdd } from './handlers/onMessageReactionAdd'
import { onMessageReactionRemove } from './handlers/onMessageReactionRemove'
import { onMessageUpdate } from './handlers/onMessageUpdate'
import { onReady } from './handlers/onReady'
import { onWebhookUpdate } from './handlers/onWebhookUpdate'

export const EventHandlers = {
	onGuildBanAdd,
	onGuildBanRemove,
	onGuildMemberRemove,
	onInteractionCreate,
	onMessage,
	onMessageDeletion,
	onMessageReactionAdd,
	onMessageReactionRemove,
	onMessageUpdate,
	onReady,
	onWebhookUpdate
}
