import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const reload: Command = {
    name: 'reload',
    description: 'Reload a command.',
    enabled: true,
    toggleable: false,

    developerOnly: true,

    execute ({ client, message, args }: { client: ExtendedClient, message: Message, args: string[] }): void {
        if (!args.length) {
            message.channel.send(`${message.author}, you didn't give me anything to reload.`)
            return null
        }
        const commandName = args[0].toLowerCase()
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        if (!command) {
            message.channel.send(`${message.author}, no such command was found.`)
            return null
        }
        delete require.cache[require.resolve(`./${command.name}.js`)]
        const newEmbed = new MessageEmbed()
        newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
            .setThumbnail('https://i.ibb.co/sJ4CyGj/admin-check.png')
            .setTimestamp()
            .setTitle('Reload Command')
        try {
            const newCommand = require(`./${command.name}`)
            client.commands.set(newCommand.default.name, newCommand.default)

            newEmbed.addField('Command Success', `Command \`${commandName}\` was reloaded!`)
            message.channel.send(newEmbed)
            console.log('[Command] [Reload] [Success]', `Command: ${newCommand.default.name.replace(/^\w/u, character => character.toUpperCase())} reloaded.`)
        } catch (error) {
            newEmbed.addField('Command Error', `There was an error while reloading a command: \`${commandName}\`\n\`${error}\``)
            message.channel.send(newEmbed)
            console.error('[Command] [Reload] [Fail]', error)
            return error
        }
    }
}

export default reload as Command
