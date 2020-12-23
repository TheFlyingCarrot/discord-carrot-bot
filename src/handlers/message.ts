import { client, Config, Discord, HelperModules } from '../internal.js'

export function onMessage (message: Discord.Message): Promise<void> {
	if (client.events.message === false && !Config.developers.includes(message.author.id.toString())) return
	// nullish coalescing operator: ?? or, or: ||
	const { command, args } = HelperModules.getCommand({ client, message, prefix: Config.prefix, developers: Config.developers }) ?? {}
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