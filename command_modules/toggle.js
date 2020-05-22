const query_aliases = ['query', 'q']
module.exports = {
	name: 'toggle',
	usage: '[command]',
	description: 'Toggle usage of a command.',
	developerOnly: true,
	execute(itemTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = itemTable

		if (!args.length) {
			message.reply(`${message.author}, you didn't give me any command to toggle.`)
			return null
		}

		let commandName = null
		let query = false
		if (args[0].toLowerCase() in query_aliases) {
			query = true
			commandName = args[1].toLowerCase()
		} else {
			commandName = args[0].toLowerCase()
		}
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		if (!command) {
			message.reply(`${message.author}, no such command was found.`)
			return null
		}

		if (query) {
			message.reply(`${message.author}, the command \`${commandName}\` is currently ${query ? 'enabled' : 'disabled'}.`)
		} else if (!command.can_toggle) {
			message.reply(`${message.author}, the command \`${commandName}\` cannot be toggled.`)
		} else if ((command.can_toggle) && ((command.enabled) || (!command.enabled))) {
			try {
				command.enabled = command.enabled ? false : true
				message.reply(`${message.author}, the command \`${commandName}\` was toggled.`)
			} catch (error) {
				message.reply(`${message.author}, toggling the command \`${commandName}\` produced an error.`)
			}
		}
	},
}