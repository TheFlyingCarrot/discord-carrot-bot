import { Command, Discord } from '../internal.js'

const avatar: Command = {
	name: 'avatar',
	description: 'Get a user\'s avatar.',
	enabled: true,
	toggleable: true,

	aliases: ['icon', 'pfp'],

	execute ({ message }): void {
		const newEmbed = new Discord.MessageEmbed()
		const user = message.mentions.users.map(userObject => userObject).shift()
		const userAvatar = message.mentions.users.size ? user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }) : message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })
		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
			.setTimestamp()
			.setTitle(`${user ? user.username : message.author.username}'s Avatar`)
			.setThumbnail(userAvatar)
		message.reply(newEmbed)
	}
}

export default avatar as Command
