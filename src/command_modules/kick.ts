import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const kick: Command = {
    name: 'kick',
    description: 'Kick a user.',
    enabled: true,
    toggleable: true,

    usage: '[user mention]',
    args: true,
    cooldown: 10,
    guildOnly: true,
    permission: 'KICK_MEMBERS',

    execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean): string | null | void {
        if (!message.member.hasPermission(this.permission, { checkAdmin: true, checkOwner: true })) {
            message.channel.send(`${message.author}, you do not have permission to use that command.`)
            return null
        }
        if (!message.mentions.members.size) {
            message.channel.send(`${message.author}, you must tag a user.`)
            return null
        }
        const targetUser = message.mentions.members.first()
        if (!targetUser.kickable) {
            message.channel.send(`${message.author}, I can't kick that user.`)
            return null
        }
        targetUser.kick(`Kicked by: ${message.author.tag}`)
            .then(() => {
                const newEmbed = new MessageEmbed()
                newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
                    .setThumbnail('https://i.ibb.co/QjCW2nx/user-banned.png')
                    .setTimestamp()
                    .setTitle('Kick Command')
                    .addField(`**${targetUser}**`, `Kicked by ${message.author}`)
                message.channel.send(newEmbed)
            })
            .catch((err) => {
                message.channel.send(`${message.author}, ${targetUser} could not be kicked.`)
                return err
            })
    }
}

export default kick as Command
