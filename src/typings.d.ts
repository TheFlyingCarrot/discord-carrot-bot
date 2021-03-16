/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIApplicationCommandInteraction } from 'discord-api-types'
import { Message, PermissionString } from 'discord.js'

declare interface Command {
	aliases?: string[]
	cooldown?: number
	enabled: boolean
	guildSpecific?: string[]
	permission?: PermissionString
	readonly args?: boolean
	readonly description: string
	readonly developer_only?: boolean
	readonly execute?: ({ args, message }: { args: string[], message: Message }) => void | Promise<void>
	readonly guild_only?: boolean
	readonly name: string
	readonly slash_command?: boolean
	readonly toggleable: boolean
	readonly usage?: string
}

/**
 * Proprietary slash command type used for Discord's Slash Commands
 * @todo Expand type to include IDs and more specifics. Is non-ephemeral storage to hold these necessary?
 */
declare interface SlashCommand {
	readonly description: string
	readonly execute?: (interaction: APIApplicationCommandInteraction) => Record<string, any> | Promise<Record<string, any>>
	readonly name: string
}

/**
 * Properties of a single Reaction Role in a ReactionRoleConfig.
 */
declare interface ReactionRole {
	category: string
	emoji_tag: string
	name: string
	role_id: string
}

/**
 * Properties of a guild's Reaction Roles' JSON object.
 */
declare interface ReactionRoleConfig {
	guild_id: string
	reaction_roles: ReactionRole[]
	role_categories: string
	role_channel_id: string
	title: string
}

declare interface Config {
	readonly default_commands_enabled: boolean
	default_cooldown: number
	readonly developers: string[]
	readonly log_tolerance_ms: number
	maximum_role_name_length: number
	ms_to_s_multiplier: number
	muted_role_ids: Record<string, string>
	personal_role_ids: Record<string, string>
	prefix: string
	time_decimals: number
}