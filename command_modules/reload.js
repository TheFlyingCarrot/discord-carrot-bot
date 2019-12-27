module.exports = {
	name: 'reload',
	description: 'Reloads a command.',
	developerOnly: true,
	execute(message, args) {
		if (!args.length) return message.reply('you didn\'t give me anything to reload!')
		const commandName = args[0].toLowerCase()
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

		if (!command) return message.reply(`there is no command with name or alias \`${commandName}\`, ${message.author}!`)

		delete require.cache[require.resolve(`./${command.name}.js`)]

		try {
			const newCommand = require(`./${command.name}.js`)
			message.client.commands.set(newCommand.name, newCommand)
			message.reply(`command \`${commandName}\` was reloaded!`)
		} catch (error) {
			console.log(error)
			message.reply(`there was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``)
		}
	},
}