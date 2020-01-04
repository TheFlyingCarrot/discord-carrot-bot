const { defaultPrefix } = require('../config.json')
module.exports = {
	name: 'help',
	aliases: ['commands', 'usage'],
	usage: '[command name]',
	description: 'List of my commands or info about a specific command.',
	execute(message, args) {
		const data = []
		const { commands } = message.client

		if (!args.length) {
			data.push('Here\'s a list of all my commands:')
			data.push(commands.map(command => command.developerOnly ? `${command.name} (dev)` : `${command.name}`).join(', '))
			data.push(`\nYou can use \`${defaultPrefix}help [command name]\` to get info on a specific command.`)

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type !== 'dm') return { title: 'Command Success', body: 'I\'ve sent you a DM with all my commands!' }
				})
				.catch((err) => {
					console.log(`Could not send help DM to ${message.author.tag}.\n`, (err))
					return { title: 'Command Fail', body: 'It appears that I can\'t DM you! Please check if you have DMs disabled.' }
				})
		}
		const name = args[0].toLowerCase()
		const command = ((commands.get(name)) || (commands.find(c => (c.aliases) && (c.aliases.includes(name)))))

		if (!command) {
			return { title: 'Command Success', body: 'That\'s not a valid command.' }
		}

		data.push(`**Name:** ${command.name}`)
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
		if (command.description) data.push(`**Description:** ${command.description}`)
		if (command.usage) data.push(`**Usage:** ${defaultPrefix}${command.name} ${command.usage}`)

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

		return { title: 'Command Success', body: data }
		// message.channel.send(data, { split: true })
	},
}