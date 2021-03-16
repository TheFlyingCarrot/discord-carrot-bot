import { cooldown, DiscordJS, isValidCommand, parseCommandFromMessage } from '../internal'

export function onMessage (message: DiscordJS.Message): void {
	const { command, args } = parseCommandFromMessage(message)
	if (!command) return

	if (isValidCommand(message, command, args)) {
		if (cooldown({ message, command })) return
		command.execute({ args, message })
	}
}
