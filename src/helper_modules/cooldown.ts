import { client, config, DiscordJS } from '../internal'
import { Command } from '../typings'

export function cooldown ({ message, command }: { message: DiscordJS.Message, command: Command }): boolean {
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new DiscordJS.Collection())
	}

	const now = Date.now()
	const timestamps = client.cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || config.default_cooldown) * config.ms_to_s_multiplier

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / config.ms_to_s_multiplier
			message.reply(`You cannot use that command for another \`${timeLeft.toFixed(config.time_decimals)}\` seconds`)
			return true
		}
	} else if (!config.developers.includes(message.author.id)) {
		timestamps.set(message.author.id, now)
		//setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	}

	return false
}
