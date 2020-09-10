module.exports = {
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { message, command, cooldowns, developers } = dataTable
		const now = Date.now()
		const timestamps = cooldowns.get(command.name)
		const cooldownAmount = (command.cooldown || 3) * 1000

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000
				message.channel.send(`${message.author}, you cannot use that command for another \`${timeLeft.toFixed(1)}\` ${timeLeft.toFixed(1) !== 1.0 ? 'seconds' : 'second'}.`)
				return false
			}
		} else if (!timestamps.has(message.author.id) && !developers.includes(message.author.id)) {
			timestamps.set(message.author.id, now)
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
		}

		return true
	},
}
