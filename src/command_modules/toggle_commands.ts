import { client } from '../internal'
import { Command } from '../typings'

const toggleCommands: Command = {
	name: 'togglecommands',
	description: 'Toggles the ability for non-developers to use commands.',
	enabled: true,
	toggleable: false,

	aliases: ['toggle-commands', 'togglecmds'],
	usage: '(true/false)',

	developer_only: true,

	execute ({ args }) {
		switch (args.shift()) {
			case 'true':
				client.commands_enabled = true
				break
			case 'false':
				client.commands_enabled = false
				break
			default:
				client.commands_enabled = !client.commands_enabled
				break
		}
		client.activity = client.commands_enabled ? '.help' : 'nobody.'
		client.user.setStatus(client.commands_enabled ? 'online' : 'dnd')
		console.log(`[Command Status] Commands ${client.commands_enabled ? 'Enabled' : 'Disabled'}`)
	}
}

export default toggleCommands as Command
