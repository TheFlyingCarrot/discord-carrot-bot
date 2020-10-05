import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const debug: Command = {
    name: 'debug',
    description: 'Log verbose info for debugging purposes.',

    enabled: true,
    toggleable: true,

    developerOnly: true,

    execute ({ client, message, args }: { client: ExtendedClient, message: Message, args: string[] }, Debugging: boolean): void {
        client.debugging = !client.debugging
        console.debug(`[Debug] [Status] ${client.debugging}`)
    }
}

export default debug as Command
