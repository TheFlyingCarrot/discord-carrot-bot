import { config, DiscordJS, getCommand } from '../internal'
import { Command } from '../typings'

const DefaultParsedMessage = { args: [], command: null, message: null }

/**
 * @param message Discord message.
 * @returns Object containing `args`, `command` of type Command, and the original message.
 */
export function parseCommandFromMessage (message: DiscordJS.Message): { args: string[] | null, command: Command | null, message: DiscordJS.Message } {
	if (!message.content.startsWith(config.prefix)) return DefaultParsedMessage
	if (message.author.bot) return DefaultParsedMessage
	if (message.system) return DefaultParsedMessage
	if (message.tts) return DefaultParsedMessage

	const input = message.content.slice(config.prefix.length)

	const args = input.split(/ +/u)
	const commandName = args.shift().toLowerCase()
	const command = getCommand(commandName)

	return { args, command, message }
}
