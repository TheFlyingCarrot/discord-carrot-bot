import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const avatar: Command = {
    name: 'avatar',
    description: 'Get a user\'s avatar.',
    enabled: true,
    toggleable: true,

    aliases: ['icon', 'pfp'],

    execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean): string | null | void {
        const newEmbed = new MessageEmbed()
        if (!message.mentions.users.size) {
            newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
                .setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
                .setTimestamp()
                .setTitle('Avatar Command')
                .addField('**Your Avatar**', `<${message.author.displayAvatarURL}>`)
        } else {
            newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
                .setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
                .setTimestamp()
                .setTitle('Avatar Command')
            message.mentions.users.map(user => {
                newEmbed.addField(`**${user.tag}'s Avatar**`, `<${user.displayAvatarURL}>`)
            })
        }
        message.channel.send(newEmbed)
    }
}

export default avatar as Command
