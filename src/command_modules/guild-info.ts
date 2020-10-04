import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const guild_info: Command = {
    name: 'guild-info',
    description: 'Generate a JSON list of information for a server.',
    enabled: true,
    toggleable: true,

    guildOnly: true,
    developerOnly: true,


    execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean): string | null | void {
        console.log('[Guild Info]', message.guild)
    }
}

export default guild_info as Command
