import { Command } from '../internal.js'

const kungfu: Command = {
	name: 'kungfu',
	description: 'Sing the kungfu fighting lyrics.',
	enabled: true,
	toggleable: true,

	execute ({ message }): void {
		message.reply('(4x) Oh-ho-ho-ho',
		'Everybody was kung fu fighting',
		'Those cats were fast as lightning',
		'In fact, it was a little bit frightening',
		'But they fought with expert timing\n',
		'There were funky China men from funky Chinatown',
		'They were chopping them up, they were chopping them down',
		'It\'s an ancient Chinese art and everybody knew their part',
		'From a feint into a slip and a kicking from the hip\n',
		'Everybody was kung fu fighting, huh',
		'Those cats were fast as lightning',
		'In fact, it was a little bit frightening, hey, yeah',
		'But they fought with expert timing\n',
		'There was funky Billy Chin and little Sammy Chung',
		'He said, "Here comes the big boss, let\'s get it on"',
		'We took a bow and made a stand, started swaying with the hand',
		'A sudden motion made me skip, now we\'re into a brand new trip\n',
		'Everybody was kung fu fighting (Huh!)',
		'Those cats were fast as lightning (Ha!)',
		'In fact, it was a little bit frightening (Huh!)',
		'But they did it with expert timing (Ha!)\n',
		'Oh yeah',
		'(4x) Oh-ho-ho-ho, ha',
		'Keep on, keep on, keep on, keep on',
		'Sure enough\n',
		'Everybody was kung fu fighting (Huh!)',
		'Those cats were fast as lightning (Ha!)',
		'In fact, it was a little bit frightening (Huh!)',
		'Make sure you have expert timing (Ha!)\n',
		'(Oh-ho-ho-ho) Kung fu fighting',
		'(Oh-ho-ho-ho) Hands and feet fast as lightning',
		'(3x) (Oh-ho-ho-ho) Huh, ha',
		'Keep on, keep on, keep on',
		'(Oh-ho-ho-ho) Huh, ha',
		'Yeah, yeah',
		'(Oh-ho-ho-ho) Huh, ha',
		'Everybody was kung fu fighting',
		'Hands and feet fast as lightning',
		'(Oh-ho-ho-ho) Huh, ha',
		'(Oh-ho-ho-ho)')
	}
}

export default kungfu as Command