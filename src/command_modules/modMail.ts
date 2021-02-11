import { Command, Discord } from '../internal.js'

const modMail: Command = {
	name: 'modmail',
	description: 'Message the admins.',
	enabled: true,
	toggleable: true,

	aliases: ['mod-mail', 'admin-mail', 'adminmail'],
	usage: '[message]',
	args: true,
	cooldown: 45,

	guildOnly: true,

	execute ({ args, message }) {
		const { guild } = message
		if (!guild.available) return
		const { publicUpdatesChannel } = guild
		if (!publicUpdatesChannel) return

		const modMail = args.join(' ')

		try {
			message.delete({ reason: 'Mod-mail' })
			const newEmbed = new Discord.MessageEmbed()
			newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
				.setTitle('Mod-Mail')
				.setTimestamp()
				.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
				.addField('Author', message.author)
				.addField('Message', modMail)
			publicUpdatesChannel.send(newEmbed)
		} catch (error) {
			console.error(error)
		}
	}
}

export default modMail as Command
