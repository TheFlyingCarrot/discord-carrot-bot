import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed, User } from '../internal.js'

const MaxFaces = 20
const MaxDie = 6

const DefaultFaces = 6
const DefaultDie = 1

function rollDice (faces: number, die: number): number {
	let sum = Math.floor(faces * Math.random()) + 1
	for (let i = 0; i < die; i++) {
		sum += Math.floor(faces * Math.random()) + 1
	}
	return sum
}

function verifyFaces (faces: number): number {
	if (!faces || faces < 0 || faces > MaxFaces) {
		return DefaultFaces
	}
	return faces
}

function verifyDie (die: number): number {
	if (!die || die < 0 || die > MaxDie) {
		return DefaultDie
	}
	return die
}

const diceroll: Command = {
	name: 'coinflip',
	description: `Flip a coin.\nMax Faces: ${MaxFaces}\nMax Die: ${MaxDie}`,
	enabled: true,
	toggleable: true,

	aliases: ['coin', 'coin-flip', 'flip', 'flipcoin', 'flip-coin'],
	usage: '(number of faces) (number of die)',

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		message.reply(`it's a ${rollDice(verifyFaces(Number(args[0])), verifyDie(Number(args[1])))}.`)
	}
}

export default diceroll as Command
