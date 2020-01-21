module.exports = {
	name: 'prune',
	aliases: ['purge', 'delete', 'erase'],
	description: 'Prune messages.',
	cooldown: 5,
	guildOnly: true,
	permission: 'MANAGE_MESSAGES',
	requiredRole: ['admin', 'mod'],
	execute(itemTable) {
		const { client, message, args, templateEmbed } = itemTable
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) {
			message.channel.send(`${message.author}, you do not have permission to use this command.`)
			return null
		}
		const amount = parseInt(args[0])
		if (isNaN(amount)) {
			message.channel.bulkDelete(2, true).catch(err => {
				console.error(err)
				message.channel.send(`${message.author}, there was an error executing that command. Error: ${err}`)
				return null
			})
		} else if ((amount < 1 || amount > 100)) {
			if (Number.isInteger(amount)) {
				message.channel.send(`${message.author}, you must input a number between 1 and 99.`)
				return null
			} else {
				message.channel.send(`${message.author}, you must input a number between 1 and 99 that is also an integer.`)
				return null
			}
		} else {
			message.channel.bulkDelete(amount + 1, true).catch((error) => {
				console.error(error)
				message.channel.send(`${message.author}, there was an error executing that command. ${error}`)
				return null
			})
		}
	},
}