import { SlashCommand } from '../typings'

const ping: SlashCommand = {
	description: 'Ping!',
	name: 'ping',
	execute () {
		return {
			type: 4,
			data: {
				content: 'Pong!'
			}
		}
	}
}

export default ping as SlashCommand
