import { config, DiscordJS, getCommand } from '../internal'
import { Command } from '../typings'

/**
 * 
 * @param message Discord message.
 * @returns Object containing `args`, `command` of type Command, and the original message.
 */
export function parseCommandFromMessage (message: DiscordJS.Message): { args: string[] | null, command: Command | null, message: DiscordJS.Message } {
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.tts || message.system) return

	const input = message.content.slice(config.prefix.length)

	const args = input.split(/ +/u)
	const commandName = args.shift().toLowerCase()
	const command = getCommand(commandName)

	return { args, command, message }
}
