import { Command } from '../internal.js'

const kungfu: Command = {
	name: 'kungfu',
	description: 'Sing the kungfu fighting lyrics.',
	enabled: true,
	toggleable: true,

	execute ({ message }): void {
		message.reply('(4x) Oh-ho-ho-ho\nEverybody was kung fu fighting\nThose cats were fast as lightning\nIn fact, it was a little bit frightening\nBut they fought with expert timing\n\nThere were funky China men from funky Chinatown\nThey were chopping them up, they were chopping them down\nIt\'s an ancient Chinese art and everybody knew their part\nFrom a feint into a slip and a kicking from the hip\n\nEverybody was kung fu fighting, huh\nThose cats were fast as lightning\nIn fact, it was a little bit frightening, hey, yeah\nBut they fought with expert timing\n\nThere was funky Billy Chin and little Sammy Chung\nHe said, "Here comes the big boss, let\'s get it on"\nWe took a bow and made a stand, started swaying with the hand\nA sudden motion made me skip, now we\'re into a brand new trip\n\nEverybody was kung fu fighting (Huh!)\nThose cats were fast as lightning (Ha!)\nIn fact, it was a little bit frightening (Huh!)\nBut they did it with expert timing (Ha!)\n\nOh yeah\n(4x) Oh-ho-ho-ho, ha\nKeep on, keep on, keep on, keep on\nSure enough\n\nEverybody was kung fu fighting (Huh!)\nThose cats were fast as lightning (Ha!)\nIn fact, it was a little bit frightening (Huh!)\nMake sure you have expert timing (Ha!)\n\n(Oh-ho-ho-ho) Kung fu fighting\n(Oh-ho-ho-ho) Hands and feet fast as lightning\n(3x) (Oh-ho-ho-ho) Huh, ha\nKeep on, keep on, keep on\n(Oh-ho-ho-ho) Huh, ha\nYeah, yeah\n(Oh-ho-ho-ho) Huh, ha\nEverybody was kung fu fighting\nHands and feet fast as lightning\n(Oh-ho-ho-ho) Huh, ha\n(Oh-ho-ho-ho)')
	}
}

export default kungfu as Command