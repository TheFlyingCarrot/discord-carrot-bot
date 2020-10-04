import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed, User } from '../internal.js'

const avatar: Command = {
    name: 'avatar',
    description: 'Get a user\'s avatar.',
    enabled: true,
    toggleable: true,

    aliases: ['icon', 'pfp'],

    execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean): string | null | void {
        const newEmbed = new MessageEmbed()
        const user = message.mentions.users.map(userObject => userObject).shift()
        const userAvatar = message.mentions.users.size ? user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }) : message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })
        newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
            .setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
            .setTimestamp()
            .setTitle(`${user ? user.username : message.author.username}'s Avatar`)
            .setThumbnail(userAvatar)
        message.channel.send(newEmbed)
    }
}

export default avatar as Command
