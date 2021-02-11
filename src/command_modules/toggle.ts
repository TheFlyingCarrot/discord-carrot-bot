import { client, Command } from '../internal.js'

const QueryAliases = ['query', 'q']

const toggle: Command = {
	name: 'toggle',
	description: 'Toggle usage of a specific command.',
	enabled: true,
	toggleable: true,

	usage: '[command] (query)',
	args: true,

	developerOnly: true,

	execute ({ args, message }) {
		const commandName = args.shift().toLowerCase()
		const query = QueryAliases.includes(args.shift().toLowerCase())

		const command = client.getCommand(commandName)
		if (!command) {
			message.reply('No such command was found.')
			return
		}

		if (query) {
			message.reply(`The command \`${commandName}\` is currently \`${command.enabled ? 'enabled' : 'disabled'}\`.`)
		} else if (!command.toggleable) {
			message.reply(`The command \`${commandName}\` cannot be toggled.`)
		} else if (command.toggleable) {
			try {
				command.enabled = !command.enabled
				message.reply(`The command \`${commandName}\` is now \`${command.enabled ? 'enabled' : 'disabled'}\`.`)
			} catch (error) {
				message.reply(`Toggling the command \`${commandName}\` produced an error.`)
				console.error(error)
			}
		}
	}
}

export default toggle as Command
