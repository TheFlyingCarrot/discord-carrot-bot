import { Command, Config, Discord, ExtendedClient } from '../internal.js'

const help: Command = {
	name: 'help',
	description: 'Commands or info about a specific command.',
	enabled: true,
	toggleable: true,

	aliases: ['commands', 'usage'],
	usage: '(command)',

	execute ({ client, message, args }): void {
		const { commands } = client
		const newEmbed = new Discord.MessageEmbed()
		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setThumbnail('https://i.ibb.co/MhzStmL/user-inquiry.png')
			.setTimestamp()
			.setTitle('Help Command')
		if (!args.length) {
			commands.forEach((command: Command) => {
				if (command.developerOnly && Config.developers.includes(message.author.id)) {
					newEmbed.addField(`**${command.name.replace(/^\w/u, character => character.toUpperCase())}** (dev-only)`, `${command.description}`, true)
				} else if (message.member && command.permission && message.member.hasPermission(command.permission, { checkAdmin: true, checkOwner: true })) {
					newEmbed.addField(`**${command.name.replace(/^\w/u, character => character.toUpperCase())}** (restricted)`, `${command.description}`, true)
				} else {
					newEmbed.addField(`**${command.name.replace(/^\w/u, character => character.toUpperCase())}**`, `${command.description}`, true)
				}
			})
			newEmbed.addField('More Info', `\nYou can use \`${Config.prefix}help [command name]\` to get help on a specific command.`)
			if (message.channel.type != 'dm') message.reply(newEmbed)
			else if (message.channel.type == 'dm') message.author.send(newEmbed)
		} else {
			const name = args[0].toLowerCase()
			const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))
			if (!command) {
				message.reply('That\'s not a valid command.')
				return null
			}
			newEmbed.addField('**Name:**', `${command.name}`)
			if (command.description) newEmbed.addField('**Description:**', `${command.description}`)
			if (command.aliases) newEmbed.addField('**Aliases:**', `${command.aliases.join(', ')}`)
			if (command.usage) newEmbed.addField('**Usage:**', `${Config.prefix}${command.name} ${command.usage}`)
			newEmbed.addField('**Cooldown:**', `${command.cooldown || 3} second(s)`)
			message.reply(newEmbed)
		}
	}
}

export default help as Command
