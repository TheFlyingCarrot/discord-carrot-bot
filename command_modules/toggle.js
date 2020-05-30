const query_aliases = ['query', 'q']
module.exports = {
	enabled: true,
	name: 'toggle',
	usage: '[command]',
	description: 'Toggle usage of a command.',
	developerOnly: true,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable

		if (!args.length) {
			message.channel.send(`${message.author}, you didn't give me any command to toggle.`)
			return null
		}

		let commandName = null
		let query = false
		if (query_aliases.includes(args[0].toLowerCase())) {
			query = true
			commandName = args[1].toLowerCase()
		} else {
			commandName = args[0].toLowerCase()
		}
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		if (!command) {
			message.channel.send(`${message.author}, no such command was found.`)
			return null
		}

		if (query) {
			message.channel.send(`${message.author}, the command \`${commandName}\` is currently \`${command.enabled ? 'enabled' : 'disabled'}\`.`)
		} else if (!command.can_toggle) {
			message.channel.send(`${message.author}, the command \`${commandName}\` cannot be toggled.`)
		} else if ((command.can_toggle) && ((command.enabled) || (!command.enabled))) {
			try {
				command.enabled = command.enabled ? false : true
				message.channel.send(`${message.author}, the command \`${commandName}\` is now \`${command.enabled ? 'enabled' : 'disabled'}\`.`)
			} catch (error) {
				message.channel.send(`${message.author}, toggling the command \`${commandName}\` produced an error.`)
			}
		}
	},
}