import { Command, Discord } from '../internal.js'

const MaxFaces = 20
const MaxDie = 6

const DefaultFaces = 6
const DefaultDie = 1

function rollDice (faces: number, die: number): number {
	let sum = 0
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
	name: 'diceroll',
	description: `Flip a coin.\nMax Faces: ${MaxFaces}\nMax Die: ${MaxDie}`,
	enabled: true,
	toggleable: true,

	aliases: ['dice', 'dice-roll', 'die', 'die-roll', 'roll', 'roll-die'],
	usage: '(number of faces) (number of die)',

	execute ({ message, args }: { client: Discord.Client, message: Discord.Message, args: string[] }): void {
		const faces = verifyFaces(Number(args[0]))
		const die = verifyDie(Number(args[1]))
		message.reply(`it's a ${rollDice(faces, die)}.\n\`${faces} Faces | ${die} ${die > 1 ? 'Dice' : 'Die'}\``)
	}
}

export default diceroll as Command
