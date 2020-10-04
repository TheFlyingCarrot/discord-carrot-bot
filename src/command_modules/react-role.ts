import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const team_discord = require('../guilds/team_discord.json')

const react_role: Command = {
    name: 'react-role',
    description: 'Add a message for reaction roles.',

    enabled: true,
    toggleable: true,

    developerOnly: true,

    execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean): string | null | void {
        if (team_discord.role_categories.includes(args[0])) {
            const newEmbed = new MessageEmbed()
            newEmbed.setTitle(`${args[0].toUpperCase()} ROLES`)
            let ReactionRole: any
            for (ReactionRole of Object.values(team_discord.reaction_roles)) {
                if (ReactionRole.category == args[0].toLowerCase()) {
                    newEmbed.addField(ReactionRole.emoji_tag, ReactionRole.name)
                }
            }
            message.channel.send(newEmbed)
        } else {
            message.channel.send(`${message.author}, please provide valid arguments for \`${this.name}\`.`)
        }
    }
}

export default react_role as Command