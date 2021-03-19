import { DiscordJS } from '../internal'
import { SlashCommand } from '../typings'

const outcomes = ['It\'s a draw!', 'You win!', 'You lose!']
const choices = ['rock', 'paper', 'scissors']

const randomIndex = (arr: Array<string>) => Math.floor(Math.random() * arr.length)

function outcomesProxy (playerChoice: string, computerChoice: string): string {
	if (playerChoice === computerChoice) return outcomes[0]
	switch (playerChoice) {
		case 'rock':
			if (computerChoice === 'paper') return outcomes[2]
			break
		case 'paper':
			if (computerChoice === 'scissors') return outcomes[2]
			break
		case 'scissors':
			if (computerChoice === 'rock') return outcomes[2]
			break
	}
	return outcomes[1]
}

function playGame (input: string): { outcome: string, playerChoice: string, computerChoice: string } {
	const computerChoice = choices[randomIndex(choices)]
	return {
		outcome: outcomesProxy(input, computerChoice),
		playerChoice: input,
		computerChoice
	}
}

const rps: SlashCommand = {
	description: 'Play a game of rock, paper, scissors.',
	name: 'rps',
	execute (interaction) {
		const Options = interaction.data.options
		// There is at least one required argument for this command.
		if (!Options) throw new Error('Interaction data did not contain expected options.')
		const MoveOption = String(Options.find(element => 'name' in element && element.name === 'move').value)
		if (!MoveOption) throw new Error('Could not find property `move` of interaction data options.')
		const Results = playGame(MoveOption)
		const ResponseEmbed = new DiscordJS.MessageEmbed()
		ResponseEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
			.setTimestamp()
			.setTitle(Results.outcome)
			.setDescription(`You chose: ${Results.playerChoice}\nComputer chose: ${Results.computerChoice}`)
			.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
		return {
			type: 4,
			data: {
				embeds: [ResponseEmbed]
			}
		}
	}
}

export default rps as SlashCommand
