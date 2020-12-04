import { Client, Message } from 'discord.js'
import { Command } from '../typings'

const stop_client: Command = {
	name: 'stop',
	description: 'Stop open client processes.',
	enabled: true,
	toggleable: true,

	developerOnly: true,

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		console.log(`=== ===STOP COMMAND CALLED, ENDING OPEN PROCESSES=== ===\nCALLER: ${message.author.tag}`)
		process.exit(0)
	}
}

export default stop_client as Command
