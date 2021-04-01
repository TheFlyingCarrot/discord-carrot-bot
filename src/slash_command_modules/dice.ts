import { ApplicationCommandInteractionDataOptionInteger } from 'discord-api-types/v8'
import { SlashCommand } from '../typings'

const MaxFaces = 20
const MinFaces = 3

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
		if (!interaction.data) throw new Error('Interaction did not contain expected `data` array.')
		const Options = interaction.data.options

		let FacesOption: ApplicationCommandInteractionDataOptionInteger | null = null
		let DiceOption: ApplicationCommandInteractionDataOptionInteger | null = null
		if (Options) {
			FacesOption = Options.find(element => element.name === 'faces') as ApplicationCommandInteractionDataOptionInteger
			DiceOption = Options.find(element => element.name === 'dice') as ApplicationCommandInteractionDataOptionInteger
		}

		const Faces = bindNumber(Number(FacesOption ? FacesOption.value : MinFaces), MaxFaces, MinFaces)
		const Dice = bindNumber(Number(DiceOption ? DiceOption.value : MinDice), MaxDice, MinDice)
		const Results = rollDice(Faces, Dice)

		return {
			type: 4,
			data: {
				content: `It's a **${Results}**.\n\`${Faces}\` Faces | \`${Dice}\` ${Dice > 1 ? 'Dice' : 'Die'}`
			}
		}
	}
}

export default dice as SlashCommand
