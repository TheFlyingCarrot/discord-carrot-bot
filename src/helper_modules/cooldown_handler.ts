const ms_to_s_multiplier = 1000
const default_cooldown = 3

export function cooldown ({ message, command, cooldowns, developers }): boolean {
    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || default_cooldown) * ms_to_s_multiplier

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / ms_to_s_multiplier
            message.reply(`you cannot use that command for another \`${timeLeft.toFixed(1)}\` seconds`)
            return true
        }
    } else if (!timestamps.has(message.author.id) && !developers.includes(message.author.id)) {
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    }

    return false
}
