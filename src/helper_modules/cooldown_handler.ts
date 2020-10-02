const ms_to_s_multiplier = 1000

function handle_cooldown({ message, command, cooldowns, developers }) {
	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || default_cooldown) * ms_to_s_multiplier

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / ms_to_s_multiplier
			message.channel.send(`${message.author}, you cannot use that command for another \`${timeLeft.toFixed(1)}\` seconds`)
			return false
		}
	} else if (!timestamps.has(message.author.id) && !developers.includes(message.author.id)) {
		timestamps.set(message.author.id, now)
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	}

	return true
}
