const { prefix, developers } = require('../helper_modules/config.json')

module.exports = {
	enabled: true,
	canToggle: true,
	name: 'help',
	aliases: ['commands', 'usage'],
	usage: '(command)',
	description: 'Commands or info about a specific command.',
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		const commands = client.commands
		if (!args.length > 0) {
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/MhzStmL/user-inquiry.png')
				.setTimestamp()
				.setTitle('Help Command')
			commands.forEach(command => {
				if ((!command.developerOnly)) {
					newEmbed.addField((`**${(command.name).replace(/^\w/, c => c.toUpperCase())}**`), `${command.description}`, true)
				} else if (developers.includes(message.author.id)) {
					newEmbed.addField((`**${(command.name).replace(/^\w/, c => c.toUpperCase())}** (dev-only)`), `${command.description}`, true)
				}
			})
			newEmbed.addField('Additional Information', `\nYou can use \`${prefix}help [command name]\` to get info on a specific command.`)
			message.author.send(newEmbed)
				.then(() => {
					if (message.channel.type !== 'dm') return message.channel.send(`${message.author}, I've sent you a DM with all my commands!`)
				})
				.catch((err) => {
					message.channel.send(`${message.author}, it appears that I can't DM you! Please check if you have DMs disabled. Some other error may have occured.`)
					return (`Could not send a help DM to ${message.author.tag}. Error: ${err}`)
				})
		} else if (args.length > 0) {
			const name = args[0].toLowerCase()
			const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))
			if (!command) {
				return message.channel.send(`${message.author}, that's not a valid command.`)
			}
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/MhzStmL/user-inquiry.png')
				.setTimestamp()
				.setTitle('Help Command')
				.addField('**Name:**', `${command.name}`)
			if (command.aliases) newEmbed.addField('**Aliases:**', `${command.aliases.join(', ')}`)
			if (command.usage) newEmbed.addField('**Usage:**', `${prefix}${command.name} ${command.usage}`)
			if (command.description) newEmbed.addField('**Description:**', `${command.description}`)
			newEmbed.addField('**Cooldown:**', `${command.cooldown || 3} second(s)`)
			message.channel.send(newEmbed)
		}
	},
}
