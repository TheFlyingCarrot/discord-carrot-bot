import { client, Config, Discord, HelperModules } from '../internal.js'

export function handleMessage (message: Discord.Message) {
	if (client.events.message === false) return
	// nullish coalescing operator: ??
	const { command, args } = HelperModules.getCommand({ client, message, prefix: Config.prefix, developers: Config.developers }) || {}
	if (command && !HelperModules.cooldown({ message, command })) {
		message.channel.startTyping()
		try {
			command.execute({ client, message, args })
		} catch (error) {
			console.error(error)
		}
		message.channel.stopTyping()
	}
}