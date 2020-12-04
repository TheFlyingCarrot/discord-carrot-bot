import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

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

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		const targetUser = message.mentions.members.first()
		if (!targetUser.bannable) {
			message.reply('I can\'t ban that user.')
			throw new Error('PermissionsError')
		}
		targetUser.ban({ reason: `Banned by: ${message.author.tag}` })
			.then(() => {
				message.reply(new MessageEmbed().setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
					.setThumbnail('https://i.ibb.co/QjCW2nx/user-banned.png')
					.setTimestamp()
					.setTitle('Ban Command')
					.addField(`**${targetUser}**`, `Banned by ${message.author}`))
			})
			.catch(console.error)
	}

}

export default ban as Command
