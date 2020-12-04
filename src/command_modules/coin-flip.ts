import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed, User } from '../internal.js'

const coinflip: Command = {
	name: 'coinflip',
	description: 'Flip a coin.',
	enabled: true,
	toggleable: true,

	aliases: ['coin', 'coin-flip', 'flip', 'flipcoin', 'flip-coin'],

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		message.reply(`${Math.random() > 0.5 ? 'Heads' : 'Tails'}.`)
	}
}

export default coinflip as Command
