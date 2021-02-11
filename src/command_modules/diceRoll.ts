import { Command } from '../internal.js'

const MaxFaces = 20
const MaxDie = 6

const DefaultFaces = 6
const DefaultDie = 1

const boundFaces = (faces: number | string): number => {
	faces = Number(faces)
	if (faces === null || isNaN(Number(faces)) || faces < 1 || faces > MaxFaces) {
		return DefaultFaces
	}
	return faces
}

const boundDice = (dice: number | string): number => {
	dice = Number(dice)
	if (dice === null || isNaN(Number(dice)) || dice < 1 || dice > MaxDie) {
		return DefaultDie
	}
	return dice
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
		const faces = boundFaces(args.shift())
		const die = boundDice(args.shift())
		message.reply(`It's a ${rollDice(faces, die)}.\n\`${faces} Faces | ${die} ${die > 1 ? 'Dice' : 'Die'}\``)
	}
}

export default diceRoll as Command
