export * as Discord from 'discord.js'
export * as fs from 'fs'
export * as path from 'path'
export { fetch } from 'node-fetch'
export * as Config from './config.json'
export { client } from './index'
export { ClientEvents, Command, ExtendedClient, ReactionRole, ReactionRoleConfig } from './typings'

export { slashCommands } from './helper_modules/slashCommands'

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
import { cooldown } from './helper_modules/cooldown'
import { fetchPartial } from './helper_modules/fetchPartial'
import { getCommand } from './helper_modules/getCommand'
import { isValidReaction } from './helper_modules/isValidReaction'

export const HelperModules = { cooldown, fetchPartial, getCommand, isValidReaction }
export const EventHandlers = { onGuildBanAdd, onGuildBanRemove, onGuildMemberRemove, onMessageDeletion, onMessageReactionAdd, onMessageReactionRemove, onMessageUpdate, onMessage, onReady, onWebhookUpdate }
