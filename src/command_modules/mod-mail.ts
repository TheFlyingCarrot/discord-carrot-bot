import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const mod_mail: Command = {
    name: 'mod-mail',
    description: 'Message the admins.',
    enabled: true,
    toggleable: true,

    aliases: ['mm', 'modmail', 'admin-mail', 'adminmail'],
    usage: '[message]',
    args: true,
    cooldown: 45,
    guildOnly: true,

    execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean): string | null | void {
        const { guild } = message
        if (!guild.available) return `Guild: ${guild} - Not Available`
        const { publicUpdatesChannel } = guild
        if (!publicUpdatesChannel) return `Guild: ${guild} - No publicUpdatesChannel`

        const modMail = args.join(' ')

        try {
            message.delete({ reason: 'Mod-mail.' })
            publicUpdatesChannel.send(`\`(Mod-mail)\` ${message.author} sent:\n'${modMail}'`)
        } catch (error) {
            return error
        }
    }
}

export default mod_mail as Command
