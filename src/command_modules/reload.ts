import { Command, Discord, ExtendedClient } from '../internal.js'

const reload: Command = {
	name: 'reload',
	description: 'Reload a command.',
	enabled: true,
	toggleable: false,

	args: true,

	developerOnly: true,

	execute ({ client, message, args }: { client: ExtendedClient, message: Discord.Message, args: string[] }): void {
		const commandName = args[0].toLowerCase()
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		if (!command) {
			message.reply('No such command was found.')
			return null
		}
		delete require.cache[require.resolve(`./${command.name}.js`)]
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const newCommand: Command = require(`./${command.name}.js`).default
		client.commands.set(newCommand.name, newCommand)

		const newEmbed = new Discord.MessageEmbed()
		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setThumbnail('https://i.ibb.co/sJ4CyGj/admin-check.png')
			.setTimestamp()
			.setTitle('Reload Command')
			.setDescription(`Command \`${commandName}\` was reloaded.`)
		message.reply(newEmbed)
		console.log('[Command Reload]', `Command ${newCommand.name} reloaded.`)
	}
}

export default reload as Command
