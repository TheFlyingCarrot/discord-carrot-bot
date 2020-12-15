import { Command, Discord } from '../internal.js'

const kick: Command = {
	name: 'kick',
	description: 'Kick a user.',
	enabled: true,
	toggleable: true,

	usage: '[user mention]',
	args: true,
	cooldown: 10,

	guildOnly: true,

	permission: 'KICK_MEMBERS',

	execute ({ message }): void {
		const targetUser = message.mentions.members.first()
		if (!targetUser.kickable) {
			message.reply('I can\'t kick that user.')
			throw new Error('PermissionsError')
		}
		targetUser.ban({ reason: `Kicked by: ${message.author.tag}` })
			.then(() => {
				message.channel.send(new Discord.MessageEmbed().setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
					.setThumbnail('https://i.ibb.co/QjCW2nx/user-banned.png')
					.setTimestamp()
					.setTitle('Kick Command')
					.addField(`**${targetUser}**`, `Kicked by ${message.author}`))
			})
			.catch(console.error)
	}
}

export default kick as Command
