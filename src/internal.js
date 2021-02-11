export * as Discord from 'discord.js'
export * as fs from 'fs'
export { fetch } from 'node-fetch'
export * as path from 'path'
export { ExtendedClient } from './client_modules/ExtendedClient'
export * as Config from './config.json'
export { client } from './index'
export { ClientEvents, Command, ReactionRole, ReactionRoleConfig } from './typings'

import { getCommand } from './client_modules/getCommand'
import { initalizeCommands } from './client_modules/initalizeCommands'
import { parseCommandFromMessage } from './client_modules/parseCommandFromMessage'

import { onGuildBanAdd } from './handlers/guildBanAdd'
import { onGuildBanRemove } from './handlers/guildBanRemove'
import { onGuildMemberRemove } from './handlers/guildMemberRemove'
import { onMessage } from './handlers/message'
import { onMessageDeletion } from './handlers/messageDelete'
import { onMessageReactionAdd } from './handlers/messageReactionAdd'
import { onMessageReactionRemove } from './handlers/messageReactionRemove'
import { onMessageUpdate } from './handlers/messageUpdate'
import { onReady } from './handlers/ready'
import { onWebhookUpdate } from './handlers/webhookUpdate'
import { canUseCommand } from './helper_modules/canUseCommand'
import { cooldown } from './helper_modules/cooldown'
import { fetchPartial } from './helper_modules/fetchPartial'
import { isValidReaction } from './helper_modules/isValidReaction'


export const ClientModules = { getCommand, initalizeCommands, parseCommandFromMessage }
export const EventHandlers = { onGuildBanAdd, onGuildBanRemove, onGuildMemberRemove, onMessageDeletion, onMessageReactionAdd, onMessageReactionRemove, onMessageUpdate, onMessage, onReady, onWebhookUpdate }
export const HelperModules = { cooldown, fetchPartial, canUseCommand, isValidReaction }
