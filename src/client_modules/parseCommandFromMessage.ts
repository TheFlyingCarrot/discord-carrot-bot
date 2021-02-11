import { client, Command, Config, Discord } from '../internal.js'


export function parseCommandFromMessage (message: Discord.Message): { args: string[] | null | undefined, command: Command | null | undefined, message: Discord.Message} {
	if (!message.content.startsWith(Config.prefix) || message.author.bot || message.tts || message.system) {
		return
	}

	const input = message.content.slice(Config.prefix.length)

	const args = input.split(/ +/u)
	const commandName = args.shift().toLowerCase()
	const command = client.getCommand(commandName)

	return { args, command, message }
}
