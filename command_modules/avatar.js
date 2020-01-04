module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	usage: '[user mention]',
	args: true,
	description: 'Get a user\'s avatar.',
	execute(message) {
		if (!message.mentions.users.size) {
			return { title: 'Command Success', body: `Your avatar: <${message.author.displayAvatarURL}>` }
		}
		let avatarList = ''
		message.mentions.users.map(user => { avatarList += (`${user.username}'s avatar: <${user.displayAvatarURL}>\n`) })
		return { title: 'Command Success', body: avatarList }
	},
}