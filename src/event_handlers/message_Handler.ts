import { client, Config, cooldown, Discord, getCommand } from '../internal.js'

export function handleMessage (message: Discord.Message) {
	if (client.events.message === false) return
	// nullish coalescing operator: ??
	const { command, args } = getCommand({ client, message, prefix: Config.prefix, developers: Config.developers }) || {}
	if (command && !cooldown({ message, command })) {
		message.channel.startTyping()
		try {
			command.execute({ client, message, args })
		} catch (error) {
			console.error(error)
		}
		message.channel.stopTyping()
	}
}