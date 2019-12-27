const fs = require('fs')
const { defaultPrefix, token } = require('./config.json')
const readGuildData = require('./extra/readGuildData.js')
const setGuildData = require('./extra/setGuildData.js')
const Discord = require('discord.js')

const client = new Discord.Client()
client.commands = new Discord.Collection()

const cooldowns = new Discord.Collection()

const commandFiles = fs.readdirSync('./command_modules').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./command_modules/${file}`)
	client.commands.set(command.name, command)
}

// Independent Vars
const INDEX_DEBUG = false

// Triggers when the client (bot) is ready.
client.once('ready', () => {
    console.log('___index.js')
    // eslint-disable-next-line no-unused-vars
    const guilds = new Map(client.guilds)
    .forEach(guild => {
        const guildFile = readGuildData.read(guild)
        console.log(guildFile[0], guildFile[1])
        if (!guildFile[0]) {
            console.log(`No file for guild: ${guild.name}`)
            setGuildData.write(guild)
                .catch(console.error)
        }
    })
    console.log('Bot Client State: Ready')
})

client.once('reconnecting', () => {
    console.log('Bot Client State: Reconnecting')
})

client.once('disconnect', () => {
    console.log('Bot Client State: Disconnected')
});

// Triggers when the bot (client) connects to a new server.
client.on('guildCreate', guildObj => {
    console.log('Added to a new guild: ' + guildObj.name)
    // eslint-disable-next-line no-unused-vars
    const guilds = client.guilds.map(g => g)
        .forEach(guild => {
            if (!fs.existsSync(`./guilds/${guild.id}.json`)) {
                console.log(`No Guild ID File Found for Guild ID: ${guild.id}`)
                const guildData = {
                    id: `${guild.id}`,
                    name: `${guild.name}`,
                    adminRoleID: NaN,
                    modRoleID: NaN,
                }
                fs.writeFileSync(`./guilds/${guild.id}.json`, JSON.stringify(guildData), 'utf-8')
            }
        })
})

// Triggers when the bot (client) is removed from a server.
client.on('guildDelete', guildObj => {
    console.log('Removed from a guild: ' + guildObj.name)
    // eslint-disable-next-line no-unused-vars
    const guilds = client.guilds.map(g => g)
    .forEach(guild => {
        if (fs.existsSync(`./guilds/${guild.id}.json`)) {
            fs.unlinkSync(`./guilds/${guild.id}.json`)
                .catch(console.error)
        }
    })
})

/* client.on('guildMemberAdd', member => {
    // const guild = member.guild
    const channel = member.guild.channels.find(ch => ch.name === 'general')
    if (!channel) {return}
    channel.send(`Welcome to the server, ${member}!`)
})

 client.on('guildMemberRemove', member => {
    // const guild = member.guild
    const channel = member.guild.channels.find(ch => ch.name === 'general')
    if (!channel) {return}
    channel.send(`Good-bye, ${member}.`)
}) */

// Triggers when any new message is recieved by the bot (client).
client.on('message', message => {
    if ((!message.content.startsWith(defaultPrefix)) || message.author.bot || message.tts || message.system) {return null}

    const args = message.content.slice(defaultPrefix.length).split(/ +/)
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
            const developerFile = ('./extra/developers.txt')
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
                reply += (`\nThe proper usage is: \`${defaultPrefix}${command.name} ${command.usage}\``)
            }
            message.reply(reply)
            .catch(console.error)
            return null
        }
        // Adds commands to the cooldowns collection.
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection())
        }
    } catch (err) { 
        console.log(err)
        return message.reply('there was an error in recognizing that command.')
        // END Command Verification
    } finally { 
        // START Debug Log
        if (INDEX_DEBUG == true) {
            let logMessage = (`*new message with prefix recognized
---- message recognized
---------- message.content:         ${message.content}
---------- message.author.tag:      ${message.author.tag}
---------- message.author.id:       ${message.author.id}
---------- message.channel:         ${message.channel}
---------- message.channel.type:    ${message.channel.type}
---------- message.createdAt:       ${message.createdAt}`)
            if (message.guild !== null) {
                logMessage += (`
---- guild recognized
---------- message.guild:           ${message.guild}
---------- message.guild.id:        ${message.guild.id}`)
            }
            if (command) {
                logMessage += (`
---- command recognized
---------- command.name:            ${command.name}`)
                if (args.length > 0) {
                logMessage += (`
---------- args:                    ${args}`)
                }
            }
            console.log(logMessage)
        }
    }
    // END Debug Log

    // START Cooldowns  *COOLDOWNS
    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount
        if ((now < expirationTime) && (message.author.id !== '238880608971915264')) {
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(`please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${command.name}\` command.`)
        }
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