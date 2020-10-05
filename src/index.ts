import { Command, ExtendedClient } from './typings'
import Discord from 'discord.js'
import { debug_log } from './helper_modules/debug_logger'
import filesys from 'fs'
import { handleCooldown } from './helper_modules/cooldown_handler'
import { handleReaction } from './helper_modules/reaction_handler'
import { validateCommand } from './helper_modules/command_validator'
const { developers, prefix } = require('./config.json')

// Discord Client Set-up
const client: ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

// Commands
for (const file of filesys.readdirSync(`${__dirname}/command_modules/`)) {
    const command: Command = require(`./command_modules/${file}`).default
    try {
        client.commands.set(command.name, command)
        console.debug('[Command] [Load] [Success]', `${file}: Command: ${command && command.name ? `'${command.name}'` : '\'Unknown\''} set.`)
    } catch (error) {
        console.error('[Command] [Load] [Fail]', `${file}: Command: ${command && command.name ? `'${command.name}'` : '\'Unknown\''} could not be loaded. Error: ${error}`)
    }
}

// Debug
client.debugging = false
console.debug('[Debug] [Status]', `${client.debugging}`)

// Shackling
client.shackled = false
console.debug('[Shackle] [Status]', `${client.shackled}`)

client
    .once('ready', () => {
        console.debug('[Client] [State] Ready')
        client.user.setStatus('online')
        client.user.setActivity('.help', { type: 'LISTENING' })
            .then(presence => console.debug('[Client] [Activity]', `${presence.activities[0].name}`))
            .catch(console.error)
    })
    .on('debug', console.debug)
    .on('warn', console.warn)
    .on('invalidated', console.error)
    .on('disconnect', console.error)
    .on('message', async (message: Discord.Message) => {
        const { command, args } = validateCommand({ client, message, prefix, developers, cooldowns })
        if (client.debugging && message.content.startsWith(prefix)) debug_log({ message, command, args, developers })

        if (!command) return null

        if (!handleCooldown({ message, command, cooldowns, developers })) return null

        message.channel.startTyping()

        try {
            const command_logs = await command.execute({ client, message, args }, client.debugging)
            if (command_logs) console.debug('[Command] [Execution] [Log]', command_logs)
        } catch (error) {
            message.channel.send(`${message.author}, \`${command.name}\` produced an unknown error.`)
            console.error('[Command] [Execution] [Error]', error)
        } finally {
            message.channel.stopTyping()
        }
    })
    .on('messageReactionAdd', async (reaction: Discord.MessageReaction, user: Discord.User) => {
        await handleReaction(client, reaction, user)
    })
