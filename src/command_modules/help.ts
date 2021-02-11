import { client, Command, Config, Discord } from '../internal.js'

const help: Command = {
	name: 'help',
	description: 'Commands or info about a specific command.',
	enabled: true,
	toggleable: true,

	aliases: ['commands', 'usage'],
	usage: '(command)',

	execute ({ args, message }) {
		const newEmbed = new Discord.MessageEmbed()
		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setThumbnail('https://i.ibb.co/MhzStmL/user-inquiry.png')
			.setTimestamp()
			.setTitle('Help Command')
			.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
		if (!args.length) {
			for (const [commandName, command] of client.commands) {
				if ((command.developerOnly && !Config.developers.includes(message.author.id))
					|| (command.guildOnly && !message.guild)
					|| (command.permission && (message.member && !message.member.hasPermission(command.permission, { checkAdmin: true, checkOwner: true })))) {
					continue
				}
				newEmbed.addField(commandName, command.description, true)
			}
			newEmbed.addField('More Info', `\nYou can use \`${Config.prefix}help [command name]\` to get help on a specific command.`)
			message.reply(newEmbed)
		} else {
			const commandName = args.shift().toLowerCase()
			
			const command = client.getCommand(commandName)
			if (!command) {
				message.reply('That\'s not a valid command.\n*It\'s possible that it may not be loaded.*')
				return
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
