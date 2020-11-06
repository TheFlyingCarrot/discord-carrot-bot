import { Command, ExtendedClient } from './typings'
import filesys from 'fs'
import Discord, { Activity, Presence } from 'discord.js'
import { handleReaction } from './helper_modules/reaction_handler'
import { getCommand } from './helper_modules/command_handler'
const { developers, prefix } = require('./config.json')

// Client Set-up
const client: ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
client.shackled = false
const cooldowns = new Discord.Collection()

// Commands
for (const file of filesys.readdirSync(`${__dirname}/command_modules/`)) {
    const command: Command = require(`./command_modules/${file}`).default
    try {
        client.commands.set(command.name, command)
    } catch (error) {
        console.error('[Command] [Load] [Fail]', `${file}: Command: ${command && command.name ? `'${command.name}'` : '\'Unknown\''} could not be loaded. Error: ${error}`)
    }
}

client
    .once('ready', () => {
        console.debug('[Client] [State] Ready')
        client.user.setStatus('online')
        setInterval(() => {
            client.user.setActivity('.help', { type: 'LISTENING' })
                .catch(console.error)
        }, 600000)
    })
    .on('debug', console.debug)
    .on('warn', console.warn)
    .on('error', console.error)
    .on('invalidated', console.error)
    .on('disconnect', console.error)
    .on('message', (message: Discord.Message) => {
        // Get command from provided args, or a empty object | future: (otherwise declare an empty object (nullish coalescing operator: ??) -- else, this would result in an error)
        const { command, args } = getCommand({ client, message, prefix, developers, cooldowns }) || {}

        if (!command) return null

        message.channel.startTyping()
        try {
            command.execute({ client, message, args })
        } catch (error) {
            console.error(error)
        } finally {
            message.channel.stopTyping()
        }
    })
    .on('messageReactionAdd', (reaction: Discord.MessageReaction, user: Discord.User) => {
        handleReaction(client, reaction, user, 'add')
    })
    .on('messageReactionRemove', (reaction: Discord.MessageReaction, user: Discord.User) => {
        handleReaction(client, reaction, user, 'remove')
    })
