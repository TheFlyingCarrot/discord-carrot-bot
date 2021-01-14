import { Command, Discord } from '../internal.js'

const outcomes = ['It\'s a draw!', 'You win!', 'You lose!']
const choices = ['rock', 'paper', 'scissors']

const outcomesProxy = new Proxy(outcomes, {
	get (target, p: string) {
		let index = parseInt(p)
		if (index < 0) {
			index += target.length
		}
		return target[index]
	}
})

function randomNumber (min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function playGame (input: string): { outcome: string, playerChoice: string, computerChoice: string } {
	const playerChoice = 'rps'.indexOf(input)
	const computerChoice = randomNumber(0, 2)
	return {
		outcome: outcomesProxy[playerChoice - computerChoice],
		playerChoice: choices[playerChoice],
		computerChoice: choices[computerChoice]
	}
}

const rockpaperscissors: Command = {
	name: 'rock-paper-scissors',
	description: 'Play a game of rock, paper, scissors.',
	enabled: true,
	toggleable: true,

	aliases: ['rockpaperscissors', 'rps'],
	usage: '(rock/paper/scissors)',
	args: true,

	execute ({ args, message }) {
		console.log(args)

		const choice = choices.find(value => value.startsWith(args[0].charAt(0)))

		console.log(choice)

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