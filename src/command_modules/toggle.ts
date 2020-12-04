import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const query_aliases = ['query', 'q']

const toggle: Command = {
	name: 'toggle',
	description: 'Toggle usage of a command.',
	enabled: true,
	toggleable: true,

	usage: '[command]',

	developerOnly: true,

	execute ({ client, message, args }: { client: ExtendedClient, message: Message, args: string[] }): void {
		if (!args.length) {
			message.reply('You didn\'t give me any command to toggle.')
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
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		if (!command) {
			message.reply('No such command was found.')
			return null
		}

		if (query) {
			message.reply(`the command \`${commandName}\` is currently \`${command.enabled ? 'enabled' : 'disabled'}\`.`)
		} else if (!command.toggleable) {
			message.reply(`the command \`${commandName}\` cannot be toggled.`)
		} else if (command.toggleable && (command.enabled || !command.enabled)) {
			try {
				command.enabled = !command.enabled
				message.reply(`the command \`${commandName}\` is now \`${command.enabled ? 'enabled' : 'disabled'}\`.`)
			} catch (error) {
				message.reply(`toggling the command \`${commandName}\` produced an error.`)
				console.error(error)
			}
		}
	}
}

export default toggle as Command
