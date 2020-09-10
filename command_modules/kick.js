module.exports = {
	enabled: true,
	canToggle: true,
	name: 'kick',
	usage: '[user mention]',
	args: true,
	description: 'Kick a user.',
	cooldown: 10,
	guildOnly: true,
	permission: 'KICK_MEMBERS',
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) {
			message.channel.send(`${message.author}, you do not have permission to use that command.`)
			return null
		}
		if (!message.mentions.members.size) {
			message.channel.send(`${message.author}, you must tag a user.`)
			return null
		}
		const targetUser = message.mentions.members.first()
		if (!targetUser.kickable) {
			message.channel.send(`${message.author}, I can't kick that user.`)
			return null
		}
		targetUser.kick(`Kicked by: ${message.author.tag}`)
			.then(() => {
				const newEmbed = templateEmbed
					.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
					.setThumbnail('https://i.ibb.co/QjCW2nx/user-banned.png')
					.setTimestamp()
					.setTitle('Kick Command')
					.addField(`**${targetUser}**`, `Kicked by ${message.author}`)
				message.channel.send(newEmbed)
				return null
			})
			.catch((err) => {
				message.channel.send(`${message.author}, ${targetUser} could not be kicked. Error: ${err}`)
			})
	},
}
