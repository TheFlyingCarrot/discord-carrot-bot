import { PermissionString } from 'discord.js'
import Discord from './internal'

declare module '*.json' {
    const value: any
    export default value
}

declare interface ExtendedClient extends Discord.Client {
    commands?: Discord.Collection<any, any>
    shackled?: boolean
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
    permission?: PermissionString
    guildSpecific?: string[]

    developerOnly?: boolean

    execute?: (client: any, message: any, args: any[] | void, MessageEmbed?: any, Debugging?: any) => string | null | void | Promise<any>
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
