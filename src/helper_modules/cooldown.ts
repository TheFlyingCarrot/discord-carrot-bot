import { client, Command, Config, Discord } from '../internal'

export function cooldown ({ message, command }: { message: Discord.Message, command: Command }): boolean {
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Discord.Collection())
	}

	const now = Date.now()
	const timestamps = client.cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || Config.default_cooldown) * Config.ms_to_s_multiplier

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / Config.ms_to_s_multiplier
			message.reply(`you cannot use that command for another \`${timeLeft.toFixed(1)}\` seconds`)
			return true
		}
	} else if (!timestamps.has(message.author.id) && !Config.developers.includes(message.author.id)) {
		timestamps.set(message.author.id, now)
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	}

	return false
}
