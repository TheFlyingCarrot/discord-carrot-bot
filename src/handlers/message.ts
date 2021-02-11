import { client, Config, Discord, HelperModules } from '../internal.js'

export function onMessage (message: Discord.Message) {
	if (client.events.message === false && !Config.developers.includes(message.author.id.toString())) return
	const { command, args } = client.parseCommandFromMessage(message) ?? {}
	if (!command) return
	if (!HelperModules.canUseCommand(message, command, args)) return
	if (HelperModules.cooldown({ message, command })) return
	try {
		message.channel.startTyping()
		command.execute({ args, message })
	} catch (error) {
		console.error(error)
	} finally {
		message.channel.stopTyping()
	}
}