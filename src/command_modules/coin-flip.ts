import { Command } from '../internal.js'

const coinflip: Command = {
	name: 'coin-flip',
	description: 'Flip a coin.',
	enabled: true,
	toggleable: true,

	aliases: ['coin', 'coinflip', 'flip', 'flipcoin', 'flip-coin'],

	execute ({ message }) {
		message.reply(`${Math.random() > 0.5 ? 'Heads' : 'Tails'}.`)
	}
}

export default coinflip as Command
