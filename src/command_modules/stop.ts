import { Command, Discord } from '../internal'

const stop_client: Command = {
	name: 'stop',
	description: 'Stop open client processes.',
	enabled: true,
	toggleable: true,

	developerOnly: true,

	execute ({ client, message }): void {
		console.log(`=== ===STOP COMMAND CALLED, ENDING OPEN PROCESSES=== ===\nCALLER: ${message.author.tag}`)
		client.destroy()
		process.exit(0)
	}
}

export default stop_client as Command
