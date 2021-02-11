import { Command, Discord } from '../internal.js'

const outcomes = ['It\'s a draw!', 'You win!', 'You lose!']
const choices = ['rock', 'paper', 'scissors']

const randomIndex = (arr: Array<any>) => Math.floor(Math.random() * arr.length)

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

const rockpaperscissors: Command = {
	name: 'rockpaperscissors',
	description: 'Play a game of rock, paper, scissors.',
	enabled: true,
	toggleable: true,

	aliases: ['rock-paper-scissors', 'rps'],
	usage: '(rock/paper/scissors)',
	args: true,

	execute ({ args, message }) {
		const input = args.pop().toLowerCase()
		const choice = choices.find(choiceFromChoices => choiceFromChoices.startsWith(input))

		if (!choice) {
			message.reply('That\'s not a possible choice!')
			return
		}

		const results = playGame(choice)

		const newEmbed = new Discord.MessageEmbed()
		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setTitle(results.outcome)
			.setDescription(`You chose: ${results.playerChoice}\nComputer chose: ${results.computerChoice}`)
			.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
		message.reply(newEmbed)

	}
}

export default rockpaperscissors as Command