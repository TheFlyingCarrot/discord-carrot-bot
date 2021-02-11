import { Command } from '../internal.js'

const MaxFaces = 20
const DefaultFaces = 6

const MaxDie = 6
const DefaultDie = 1

const boundNumber = (input: number | string, maxInput: number, defaultReturn: number): number => {
	input = Number(input)
	if (input === null || isNaN(Number(input)) || input < 1 || input > maxInput) {
		return defaultReturn
	}
	return input
}

const rollDice = (faces: number, die: number): number => {
	let sum = 0
	for (let i = 0; i < die; i++) {
		sum += Math.floor(faces * Math.random()) + 1
	}
	return sum
}

const diceRoll: Command = {
	name: 'diceroll',
	description: `Roll dice.\nMax Faces: ${MaxFaces}\nMax Die: ${MaxDie}`,
	enabled: true,
	toggleable: true,

	aliases: ['dice', 'dice-roll', 'die', 'die-roll', 'roll', 'roll-die', 'roll-dice'],
	usage: '(number of faces) (number of die)',

	execute ({ args, message }) {
		const faces = boundNumber(args.shift(), MaxFaces, DefaultFaces)
		const die = boundNumber(args.shift(), MaxDie, DefaultDie)
		message.reply(`It's a ${rollDice(faces, die)}.\n\`${faces} Faces | ${die} ${die > 1 ? 'Dice' : 'Die'}\``)
	}
}

export default diceRoll as Command
