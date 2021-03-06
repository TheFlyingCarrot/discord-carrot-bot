import { client } from '../internal'
import { Command } from '../typings'

const stop_client: Command = {
	name: 'stop',
	description: 'Stop open client processes.',
	enabled: true,
	toggleable: true,

	aliases: ['kill','commit-sudoku'],

	developer_only: true,

	execute ({ message }) {
		console.log(`=== ===STOP COMMAND CALLED, ENDING OPEN PROCESSES=== ===\nCALLER: ${message.author.tag}`)
		client.destroy()
		process.exit(0)
	}
}

export default stop_client as Command
