import { Command } from '../internal.js'

const coinFlip: Command = {
	name: 'coinflip',
	description: 'Flip a coin.',
	enabled: true,
	toggleable: true,

	aliases: ['coin', 'coin-flip', 'flip', 'flipcoin', 'flip-coin'],

	execute ({ message }) {
		message.reply(`${Math.round(Math.random()) ? 'Heads' : 'Tails'}.`)
	}
}

export default coinFlip as Command
