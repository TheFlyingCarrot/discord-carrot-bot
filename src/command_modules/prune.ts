import { Command } from '../internal.js'

const prune: Command = {
	name: 'prune',
	description: 'Prune messages.',
	enabled: true,
	toggleable: true,

	aliases: ['purge', 'delete', 'erase'],
	usage: '(number of messages to delete)',
	cooldown: 5,

	guildOnly: true,

	permission: 'MANAGE_MESSAGES',

	execute ({ message, args }) {
		if (message.channel.type === 'dm') return
		if (!message.member.hasPermission(this.permission, { checkAdmin: true, checkOwner: true })) {
			message.reply('You do not have permission to use this command.')
			return
		}
		const amount = parseInt(args[0], 10)
		if (isNaN(amount)) {
			message.channel.bulkDelete(2, true)
				.catch((err) => {
					console.error(err)
					message.reply(`there was an error executing that command. Error: ${err}`)
				})
		} else if (amount < 1 || amount > 99) {
			if (Number.isInteger(amount)) {
				message.reply('You must input a number between 1 and 99.')
			} else {
				message.reply('You must input a number between 1 and 99 that is also an integer.')
			}
		} else {
			message.channel.bulkDelete(amount + 1, true)
				.catch((error) => {
					console.error(error)
				})
		}

		return
	}
}

export default prune as Command
