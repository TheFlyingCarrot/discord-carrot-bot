import Discord, { Client, Message, MessageEmbed } from '../internal.js'
import { ExtendedClient } from '../typings.js'

const query_aliases = ['query', 'q']

const toggle: Command = {
  name: 'toggle',
	description: 'Toggle usage of a command.',
  enabled: true,
  toggleable: true,

	usage: '[command]',
  developerOnly: true,
  
  execute ({ client, message, args }: { client: ExtendedClient, message: Message, args: string[] }, Debugging: boolean): string | null | void {
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
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		if (!command) {
			message.channel.send(`${message.author}, no such command was found.`)
			return null
		}

		if (query) {
			message.channel.send(`${message.author}, the command \`${commandName}\` is currently \`${command.enabled ? 'enabled' : 'disabled'}\`.`)
		} else if (!command.toggleable) {
			message.channel.send(`${message.author}, the command \`${commandName}\` cannot be toggled.`)
		} else if ((command.toggleable) && ((command.enabled) || (!command.enabled))) {
			try {
				command.enabled = !command.enabled
				message.channel.send(`${message.author}, the command \`${commandName}\` is now \`${command.enabled ? 'enabled' : 'disabled'}\`.`)
			} catch (err) {
				message.channel.send(`${message.author}, toggling the command \`${commandName}\` produced an error.`)
				return err
			}
		}
	}
}

export default toggle as Command
