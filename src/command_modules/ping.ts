import { Command } from '../internal.js'

const ping: Command = {
	name: 'ping',
	description: 'Ping!',

	enabled: true,
	toggleable: true,

	execute ({ message }): void {
		message.reply('Pong!')
	}
}

export default ping as Command
