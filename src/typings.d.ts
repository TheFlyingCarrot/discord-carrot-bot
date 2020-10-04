import Discord from './internal'

declare module '*.json' {
    const value: any
    export default value
}

interface ExtendedClient extends Discord.Client {
    commands?: Discord.Collection<any, any>
    debugging?: boolean
}

interface Command {
    name: string
    description: string
    enabled: boolean
    toggleable: boolean

    aliases?: string[]
    usage?: string
    args?: boolean
    cooldown?: number

    guildOnly?: boolean
    permission?: string
    guildSpecific?: string[]

    developerOnly?: boolean

    execute?: (client: any, message: any, args: any[] | void, MessageEmbed?: any, Debugging?: any) => string | null | void
}

interface ReactionRole {
    name?: string
    category?: string
    role_id?: string
    emoji_name?: string
    emoji_id?: string
    emoji_tag?: string
}
