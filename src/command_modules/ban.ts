import { Command, Discord } from '../internal.js'

const ban: Command = {
	name: 'ban',
	description: 'Ban a user.',
	enabled: true,
	toggleable: true,

	aliases: ['icon', 'pfp'],
	usage: '[user mention]',
	args: true,
	cooldown: 10,

	guildOnly: true,
	permission: 'BAN_MEMBERS',

	execute ({ message }) {
		const targetUser = message.mentions.members.first()
		if (!targetUser.bannable) {
			message.reply('I can\'t ban that user.')
			throw new Error('PermissionsError')
		}
		targetUser.ban({ reason: `Banned by: ${message.author.tag}` })
			.then(() => {
				const newEmbed = new Discord.MessageEmbed()
				newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
					.setThumbnail('https://i.ibb.co/QjCW2nx/user-banned.png')
					.setTimestamp()
					.setTitle('Ban')
					.setFooter(`Carrot Bot${process.env.NODE_ENV === 'test' ? ' | Test Build' : ''}`)
					.addField(`**${targetUser}**`, `Banned by ${message.author}`)
				message.reply(newEmbed)
			})
			.catch(console.error)
	}

}

export default ban as Command
