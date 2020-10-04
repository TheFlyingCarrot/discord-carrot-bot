import { Command, ExtendedClient } from './typings'
import Discord from 'discord.js'
import { debug_log } from './helper_modules/debug_logger'
import filesys from 'fs'
import { handle_cooldown } from './helper_modules/cooldown_handler'
import { handle_reaction } from './helper_modules/reaction_handler'
import { validate_command } from './helper_modules/command_validator'
const { developers, prefix } = require('./config.json')

// Discord Client Set-up
const client: ExtendedClient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.BOT_TOKEN)
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

// Command Palette Setup
for (const file of filesys.readdirSync(`${__dirname}/command_modules/`)) {
    const command: Command = require(`./command_modules/${file}`).default
    try {
        if (file != 'hoists.js') {
            client.commands.set(command.name, command)
            console.log(`[Command Loading] ${file.replace(/^\w/u, character => character.toUpperCase())}: Command: ${command && command.name ? `'${command.name}'` : '\'Unknown\''} set.`)
        }
    } catch (error) {
        console.error(`[Command Loading] ${file.replace(/^\w/u, character => character.toUpperCase())}: Command: ${command && command.name ? `'${command.name}'` : '\'Unknown\''} could not be loaded. Error: ${error}`)
    }
}

// Debug
client.debugging = false
console.log(`[Debug] [Status] ${client.debugging.toString().replace(/^\w/u, character => character.toUpperCase())}`)

// Shackling
client.shackled = false
console.log(`[Shackle] [Status] ${client.shackled.toString().replace(/^\w/u, character => character.toUpperCase())}`)

// Triggers when the client is ready.
client.once('ready', () => {
    console.log('[Client] [State] Ready')
    client.user.setStatus('online')
    client.user.setActivity('.help', { type: 'LISTENING' })
        .then(presence => console.log(`[Client] [Activity] ${presence.activities[0].name}`))
        .catch(console.error)
})

// Triggers when any message in any guild has a reaction added to it.
client.on('messageReactionAdd', async (reaction: Discord.MessageReaction, user: Discord.User) => {
    if (reaction.partial) {
        try {
            await reaction.fetch()
        } catch (error) {
            console.error(error)
            return null
        }
    }
    if (user.partial) {
        try {
            await user.fetch()
        } catch (error) {
            console.error(error)
            return null
        }
    }
    handle_reaction(client, reaction, user)
})

// Triggers when any new message is recieved by the bot (client).
client.on('message', async (message: Discord.Message) => {
    // Command Validation
    const commandArray = { client, message, prefix, developers, cooldowns }
    const { command, args } = validate_command(commandArray)
    if (client.debugging && message.content.startsWith(prefix)) debug_log({ message, command, args, developers })
    if (!command) return null
    // Cooldown Handling
    if (!handle_cooldown({ message, command, cooldowns, developers })) return null
    // Command Execution
    message.channel.startTyping()
    try {
        const command_execution_logs = await command.execute({ client, message, args }, client.debugging)
        if (command_execution_logs) console.error(command_execution_logs)
    } catch (error) {
        message.channel.send(`${message.author}, \`${command.name}\` produced an unknown error.`)
        console.error(error)
    } finally {
        message.channel.stopTyping()
    }
})

client
    .on('debug', console.log)
    .on('warn', console.log)
