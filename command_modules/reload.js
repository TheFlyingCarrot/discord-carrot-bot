module.exports = {
	enabled: true,
	name: 'reload',
	description: 'Reloads a command.',
	developerOnly: true,
	execute(itemTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = itemTable
		if (!args.length) {
			message.reply(`${message.author}, you didn't give me anything to reload.`)
			return null
		}
		const commandName = args[0].toLowerCase()
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		if (!command) {
			message.reply(`${message.author}, no such command was found.`)
			return null
		}
		delete require.cache[require.resolve(`./${command.name}.js`)]
		try {
			const newCommand = require(`./${command.name}.js`)
			message.client.commands.set(newCommand.name, newCommand)
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/sJ4CyGj/admin-check.png')
				.setTimestamp()
				.setTitle('Reload Command')
				.addField('Command Success', `Command \`${commandName}\` was reloaded!`)
			message.channel.send(newEmbed)
			return null
		} catch (err) {
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/8bCYm1p/admin-warning.png')
				.setTimestamp()
				.setTitle('Reload Command')
				.addField('Command Error', `There was an error while reloading a command \`${commandName}\`:\n\`${err}\``)
			message.channel.send(newEmbed)
			return err
		}
	},
}