import { DiscordJS, HelperModules, parseCommandFromMessage } from '../internal'

export function onMessage (message: DiscordJS.Message): void {
	const { command, args } = parseCommandFromMessage(message) ?? {}
	if (command && HelperModules.canUseCommand(message, command, args)) {
		if (HelperModules.cooldown({ message, command })) return
		command.execute({ args, message })
	}
}
