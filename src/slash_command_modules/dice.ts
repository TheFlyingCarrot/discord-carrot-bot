import { SlashCommand } from '../typings'

const MaxFaces = 20
const MinFaces = 6

const MaxDice = 6
const MinDice = 1

const bindNumber = (input: number, maxInput: number, minInput: number): number => {
	return Math.max(minInput, Math.min(maxInput, input))
}

const rollDice = (faces: number, dice: number): number => {
	let sum = 0
	for (let i = 0; i < dice; i++) {
		sum += Math.floor(faces * Math.random()) + 1
	}
	return sum
}

const dice: SlashCommand = {
	description: 'Roll dice.',
	name: 'dice',
	execute (interaction) {
		const Options = interaction.data.options ?? []

		const FacesOption = Options.find(element => 'name' in element && element.name === 'faces')
		const Faces = bindNumber(Number(FacesOption ? FacesOption.value : MinFaces), MaxFaces, MinFaces)

		const DiceOption = Options.find(element => 'name' in element && element.name === 'dice')
		const Dice = bindNumber(Number(DiceOption ? DiceOption.value : MinDice), MaxDice, MinDice)

		return {
			type: 4,
			data: {
				content: `It's a **${rollDice(Faces, Dice)}**.\n\`${Faces}\` Faces | \`${Dice}\` ${Dice > 1 ? 'Dice' : 'Die'}`
			}
		}
	}
}

export default dice as SlashCommand
