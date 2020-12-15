import { Discord } from './internal'

declare module '*.json' {
	const value: any
	export default value
}

declare interface ExtendedClient extends Discord.Client {
	[x: string]: any
	commands?: Discord.Collection<any, any>
	commandsEnabled?: boolean
	activity?: string
	events?: ClientEvents
}

declare interface Command {
	name: string
	description: string
	enabled: boolean
	toggleable: boolean

	aliases?: string[]
	usage?: string
	args?: boolean
	cooldown?: number

	guildOnly?: boolean
	permission?: Discord.PermissionString
	guildSpecific?: string[]

	developerOnly?: boolean

	execute?: ({ client, message, args }: { client: Discord.Client, message: Discord.Message, args: string[] }) => string | null | void | Promise<any>
}

declare interface ReactionRoleConfig {
	title: string
	guild_id: string
	role_channel_id: string
	reaction_roles: ReactionRole[]
}

declare interface ReactionRole {
	name: string
	category: string
	role_id: string
	emoji_name: string
	emoji_id: string
	emoji_tag: string
}

declare interface ClientEvents {
	webhookUpdate: boolean
	message: boolean
	messageUpdate: boolean
	messageDelete: boolean
	messageReactionAdd: boolean
	messageReactionRemove: boolean
	guildMemberRemove: boolean
	guildBanAdd: boolean
	guildBanRemove: boolean
}