import { Command, Discord } from '../internal.js'

const ping: Command = {
	name: 'ping',
	description: 'Ping!',

	enabled: true,
	toggleable: true,

	execute ({ message }): void {
		message.channel.send('Pong!')
	}
}

export default ping as Command
