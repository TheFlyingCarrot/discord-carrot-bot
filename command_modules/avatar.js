module.exports = {
	enabled: true,
	can_toggle: true,
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	usage: '[user mention]',
	description: 'Get a user\'s avatar.',
	execute(itemTable) {
		const { client, message, args, templateEmbed } = itemTable
		if (!message.mentions.users.size) {
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
				.setTimestamp()
				.setTitle('Avatar Command')
				.addField('**Your Avatar**', `<${message.author.displayAvatarURL}>`, true)
			message.reply(newEmbed)
			return null
		} else {
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
				.setTimestamp()
				.setTitle('Avatar Command')
			message.mentions.users.map(user => {
				newEmbed.addField(`**${user.tag}'s Avatar**`, `<${user.displayAvatarURL}>`, true)
			})
			message.channel.send(newEmbed)
			return null
		}
	},
}