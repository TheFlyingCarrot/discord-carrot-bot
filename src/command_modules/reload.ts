import { client, DiscordJS, getCommand } from '../internal'
import { Command } from '../typings'

const reload: Command = {
	name: 'reload',
	description: 'Reload a command.',
	enabled: true,
	toggleable: false,

	args: true,

	developer_only: true,

	execute ({ args, message }) {
		const commandName = args.shift().toLowerCase()
		const command = getCommand(commandName)
		if (!command) {
			message.reply('No such command was found.')
			return
		}
		delete require.cache[require.resolve(`./${command.name}.js`)]
		const newCommand: Command = require(`./${command.name}.js`).default
		if (!newCommand) return
		client.commands.set(newCommand.name, newCommand)

		const newEmbed = new DiscordJS.MessageEmbed()
		newEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
			.setThumbnail('https://i.ibb.co/sJ4CyGj/admin-check.png')
			.setTimestamp()
			.setTitle('Reload Command')
			.setDescription(`Command \`${commandName}\` was reloaded.`)
		message.reply(newEmbed)
		console.log('[Command Reload]', `Command ${newCommand.name} reloaded.`)
	}
}

export default reload as Command
