module.exports = {
	name: 'prune',
	aliases: ['purge', 'delete', 'erase'],
	description: 'Prune messages.',
	cooldown: 5,
	guildOnly: true,
	permission: 'MANAGE_MESSAGES',
	requiredRole: ['admin', 'mod'],
	execute(message, args) {
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) {
			message.reply('you do not have permission to use this command.')
			return null
		}
		const amount = parseInt(args[0])
		if (isNaN(amount)) {
			message.channel.bulkDelete(2, true).catch(err => {
				console.error(err)
				message.reply(`There was an error executing that command. Error: ${err}`)
				return null
			})
		} else if ((amount < 2 || amount > 100)) {
			if (Number.isInteger(amount)) {
				message.reply('You must input a number between 2 and 99.')
				return null
			} else {
				message.reply('You must input a number between 2 and 99 that is also an integer.')
				return null
			}
		} else {
			message.channel.bulkDelete(amount, true).catch((error) => {
				console.error(error)
				message.reply(`There was an error executing that command. ${error}`)
				return null
			})
		}
	},
}