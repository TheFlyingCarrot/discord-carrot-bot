import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const prune: Command = {
    name: 'prune',
    description: 'Prune messages.',
    enabled: true,
    toggleable: true,

    aliases: ['purge', 'delete', 'erase'],
    usage: '(number of messages to delete)',
    cooldown: 5,
    guildOnly: true,
    permission: 'MANAGE_MESSAGES',

    execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
        if (!message.member.hasPermission(this.permission, { checkAdmin: true, checkOwner: true })) {
            message.channel.send(`${message.author}, you do not have permission to use this command.`)
            return null
        }
        if (message.channel.type == 'dm') return null
        const amount = parseInt(args[0], 10)
        if (isNaN(amount)) {
            message.channel.bulkDelete(2, true)
                .catch((err) => {
                    console.error(err)
                    message.channel.send(`${message.author}, there was an error executing that command. Error: ${err}`)
                })
        } else if (amount < 1 || amount > 100) {
            if (Number.isInteger(amount)) {
                message.channel.send(`${message.author}, you must input a number between 1 and 99.`)
            } else {
                message.channel.send(`${message.author}, you must input a number between 1 and 99 that is also an integer.`)
            }
        } else {
            message.channel.bulkDelete(amount + 1, true)
                .catch((err) => {
                    message.channel.send(`${message.author}, I encountered an error executing that command.`)
                    return err
                })
        }

        return null
    }
}

export default prune as Command
