import { Command, Discord } from '../internal.js'

const ping: Command = {
	name: 'ping',
	description: 'Ping!',

	enabled: true,
	toggleable: true,

	execute ({ message }: { client: Discord.Client, message: Discord.Message, args: string[] }): void {
		message.channel.send('Pong!')
	}
}

export default ping as Command
