export { ClientEvents, Command, ExtendedClient, ReactionRole, ReactionRoleConfig } from './typings'
export { client } from './index'
export { fetch } from 'node-fetch'
export * as Config from './config.json'
export * as Discord from 'discord.js'
export * as fs from 'fs'

import { cooldown } from './helper_modules/cooldown'
import { fetchPartial } from './helper_modules/fetchPartial'
import { getCommand } from './helper_modules/getCommand'
import { isValidReaction } from './helper_modules/isValidReaction'
import { onReady } from './helper_modules/onReady'

export const HelperModules = { cooldown, fetchPartial, getCommand, isValidReaction, onReady }

import { handleGuildBanAdd } from './event_handlers/guildBanAdd_Handler'
import { handleGuildBanRemove } from './event_handlers/guildBanRemove_Handler'
import { handleGuildMemberRemove } from './event_handlers/guildMemberRemove_Handler'
import { handleMessage } from './event_handlers/message_Handler'
import { handleMessageDeletion } from './event_handlers/messageDelete_Handler'
import { handleMessageReactionAdd } from './event_handlers/messageReactionAdd_Handler'
import { handleMessageReactionRemove } from './event_handlers/messageReactionRemove_Handler'
import { handleMessageUpdate } from './event_handlers/messageUpdate_Handler'
import { handleWebhookUpdate } from './event_handlers/webhookUpdate_Handler'

export const EventHandlers = { handleGuildBanAdd, handleGuildBanRemove, handleGuildMemberRemove, handleMessageDeletion, handleMessageReactionAdd, handleMessageReactionRemove, handleMessageUpdate, handleMessage, handleWebhookUpdate }
