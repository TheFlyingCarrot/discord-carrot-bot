const kick: Command = {
	name: 'kick',
	description: 'Kick a user.',
	usage: '[user mention]',
	args: true,
	cooldown: 10,

	enabled: true,
	toggleable: true,

	guildOnly: true,
	permission: 'KICK_MEMBERS',

    execute (_client, message, _args, MessageEmbed): void {
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
				const newEmbed = new MessageEmbed
					.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
					.setThumbnail('https://i.ibb.co/QjCW2nx/user-banned.png')
					.setTimestamp()
					.setTitle('Kick Command')
					.addField(`**${targetUser}**`, `Kicked by ${message.author}`)
				message.channel.send(newEmbed)
				return null
			})
			.catch((err) => {
				message.channel.send(`${message.author}, ${targetUser} could not be kicked.`)
				return err
			})
	
		return null
	}
}
