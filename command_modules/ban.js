module.exports = {
	name: 'ban',
	usage: '[user mention]',
	args: true,
	description: 'Ban a user.',
	cooldown: 30,
	guildOnly: true,
	permission: 'BAN_MEMBERS',
	requiredRole: ['admin'],
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
		if (!targetUser.bannable) {
			message.reply('I can\'t ban that user.')
			return null
		}
		targetUser.ban().then(() => {
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/QjCW2nx/user-banned.png')
				.setTimestamp()
				.setTitle('Ban Command')
				.addField(`**${targetUser}**`, `Banned by ${message.author}`)
			message.channel.send(newEmbed)
		}).catch((err) => {
			message.reply(`${targetUser} could not be banned. Error: ${err}`)
		})
	},
}