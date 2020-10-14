import { Command, ExtendedClient } from './typings'
import filesys from 'fs'
import Discord, { Activity, Presence } from 'discord.js'
import { cooldown } from './helper_modules/cooldown_handler'
import { handleReaction } from './helper_modules/reaction_handler'
import { validateCommand } from './helper_modules/command_validator'
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
        const { command, args } = validateCommand({ client, message, prefix, developers, cooldowns })
        if (!command) return null

        if (cooldown({ message, command, cooldowns, developers })) return null

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
        handleReaction(client, reaction, user)
    })
    .on('presenceUpdate', (newPresence) => {
        if (newPresence && newPresence.user) {
            if (newPresence.user.equals(client.user)) {
                if (client.user.presence) {
                    client.user.setActivity('.help', { type: 'LISTENING' })
                        .catch(console.error)
                }
            }
        }
    })
