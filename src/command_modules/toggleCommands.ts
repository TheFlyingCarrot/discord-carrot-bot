import { client, Command } from '../internal.js'

const toggleCommands: Command = {
	name: 'togglecommands',
	description: 'Toggles the ability for non-developers to use commands.',
	enabled: true,
	toggleable: false,

	aliases: ['toggle-commands', 'togglecmds'],
	usage: '(true/false)',

	developerOnly: true,

	execute ({ args }) {
		switch (args.pop()) {
			case 'true':
				client.commandsEnabled = true
				break
			case 'false':
				client.commandsEnabled = false
				break
			default:
				client.commandsEnabled = !client.commandsEnabled
				break
		}
		client.activity = client.commandsEnabled ? '.help' : 'nobody.'
		client.user.setStatus(client.commandsEnabled ? 'online' : 'dnd')
		console.log(`[Command Status] Commands ${client.commandsEnabled ? 'Enabled' : 'Disabled'}`)
	}
}

export default toggleCommands as Command
