const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

const { prefix, token } = require('./config.json')
const commandFiles = fs.readdirSync('./command_modules').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./command_modules/${file}`)
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	client.commands.set(command.name, command)
}

// triggers when the bot is activated
client.once('ready', () => {
    console.log('Bot Client: Ready')
})

client.on('message', message => {
    if ((!message.content.startsWith(prefix)) || message.author.bot || message.tts || message.system) {return null}

    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    // Start Command Verification
    try {
        // Not a command.
        if (!command) {
            return
        }
        // Developer-Only Command.
        if (command.developerOnly) {
            const developerFile = ('./developers.txt')
            if (!fs.existsSync(developerFile)) {
                console.log(`File ${developerFile} not found.`)
                return message.reply('there was an error in finding the developers.')
            } else {
                const developers = fs.readFileSync(developerFile, 'utf-8', (err, data) => {
                    if (err) throw err
                    console.log(data)
                    return message.reply('there was an error in finding the developers.')
                })
                if (!developers.includes(message.author.id)) {
                    return message.reply('that is a developer-only command. Sorry!')
                }
            }
        }
        // Guild/Server-Only Command.
        if (command.guildOnly && (message.channel.type !== 'text')) {
            return message.reply('I can\'t execute that command inside Direct Messages.')
        }
        // Check for the required permissions.
        if (command.permission && (!message.guild.me.hasPermission(command.permission))) {
            return message.reply(`I need the ${command.permission} permission to execute that command.`)
        }
        // Check for arguments. If none exist, reply with reason and provide usage, if it exists.
        if (command.args && !args.length) {
            let reply = 'that command requires arguments.'
            if (command.usage) {
                reply += (`\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\``)
            }
            return message.channel.send(reply)
        }
        // Adds commands to the cooldowns collection.
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection())
        }
    } catch (err) { 
        console.log(err)
        return message.reply('there was an error in recognizing that command.')
    } finally {
        // END Command Verification 
        // START Debug Log
        try {
            let logMessage = (`****** new message with prefix recognized
            ------ message recognized
                ------ message.content:         ${message.content}
                ------ message.author.tag:      ${message.author.tag}
                ------ message.author.id:       ${message.author.id}
                ------ message.channel:         ${message.channel}
                ------ message.channel.type:    ${message.channel.type}`)
            if (message.guild !== null) {
                logMessage += (`
            ------ guild recognized
                ------ message.guild:           ${message.guild}
                ------ message.guild.id:        ${message.guild.id}`)
            }
            if (command) {
                logMessage += (`
            ------ command recognized
                ------ command.name:            ${command.name}`)
                if (args.length > 0) {
                logMessage += (`
                ------ args:                    ${args}`)
                }
            }
            console.log(logMessage)
        } catch(err) { console.log(err) }
    }
    // END Debug Log

    // START Cooldowns  *COOLDOWNS
    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(`please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${command.name}\` command.`) }
    } else if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    }
    // END Cooldowns

    // START Execute Command
    try {
        command.execute(message, args)
    } catch (err) {
        console.log(err)
        message.reply('there was an error trying to execute that command.') 
    }
    // END Execute Command
})

client.login(token)