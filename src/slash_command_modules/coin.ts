import { SlashCommand } from '../typings'

const coinFlip: SlashCommand = {
	description: 'Flip a coin.',
	name: 'coin',
	execute () {
		return {
			type: 4,
			data: {
				content: `${Math.round(Math.random()) ? 'Heads' : 'Tails'}.`
			}
		}
	}
}

export default coinFlip as SlashCommand
