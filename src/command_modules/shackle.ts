import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const shackle: Command = {
    name: 'shackle',
    description: 'Restrict the bot to developer use only.',
    enabled: true,
    toggleable: true,

    developerOnly: true,

    execute ({ client, message, args }: { client: ExtendedClient, message: Message, args: string[] }, Debugging: boolean): string | null | void {
        client.shackled = !client.shackled
        console.log(`[Shackle] [Status] ${client.shackled.toString().replace(/^\w/u, character => character.toUpperCase())}`)
    }
}
