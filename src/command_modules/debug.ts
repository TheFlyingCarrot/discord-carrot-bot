import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const debug: Command = {
    name: 'debug',
    description: 'Log verbose info for debugging purposes.',

    enabled: true,
    toggleable: true,

    developerOnly: true,

    execute ({ client, message, args }: { client: ExtendedClient, message: Message, args: string[] }, Debugging: boolean): string {
        client.debugging = !client.debugging
        return `Verbose debug info ${client.debugging ? 'enabled' : 'disabled'}.`
    }
}

export default debug as Command
