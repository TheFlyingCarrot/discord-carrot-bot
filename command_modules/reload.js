module.exports = {
	name: 'reload',
	description: 'Reloads a command.',
	developerOnly: true,
	execute(message, args) {
		if (!args.length) {
			return { title: '[DEV] Command Fail', body: 'You didn\'t give me anything to reload!' }
		}
		const commandName = args[0].toLowerCase()
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

		if (!command) {
			return { title: '[DEV] Command Fail', body: `There is no command with name or alias \`${commandName}\`, ${message.author}!` }
		}

		delete require.cache[require.resolve(`./${command.name}.js`)]

		try {
			const newCommand = require(`./${command.name}.js`)
			message.client.commands.set(newCommand.name, newCommand)
			return { title: '[DEV] Command Success', body: `Command \`${commandName}\` was reloaded!` }
		} catch (error) {
			console.log(error)
			return { title: '[DEV] Command Error', body: `There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\`` }
		}
	},
}