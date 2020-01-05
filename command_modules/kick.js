module.exports = {
	name: 'kick',
	usage: '[user mention]',
	args: true,
	description: 'Kick a user.',
	cooldown: 10,
	guildOnly: true,
	permission: 'KICK_MEMBERS',
	requiredRole: ['admin', 'mod'],
	execute(itemTable) {
		const { client, message, args, templateEmbed } = itemTable
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) {
			message.reply('you do not have permission to use that command.')
			return null
		}
		if (!message.mentions.members.size) {
			message.reply('you must tag a user.')
			return null
		}
		const targetUser = message.mentions.members.first()
		if (!targetUser.kickable) {
			message.reply('I can\'t kick that user.')
			return null
		}
		targetUser.kick().then(() => {
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/QjCW2nx/user-banned.png')
				.setTimestamp()
				.setTitle('Kick Command')
				.addField(`**${targetUser}**`, `Kicked by ${message.author}`)
			message.channel.send(newEmbed)
			return null
		}).catch((err) => {
			message.reply(`${targetUser} could not be kicked. Error: ${err}`)
		})
	},
}