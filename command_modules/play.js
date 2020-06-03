module.exports = {
	enabled: false,
	can_toggle: false,
	name: 'play',
	usage: '[link]',
	description: 'Play a tune.',
	cooldown: 5,
	guildOnly: true,
	async execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		if (message.member.voice.channel) {
			if (!args) {
				message.channel.send(`${message.author}, you didn't give any song to play.`)
			} else {
				// TODO: integrate actually playing audio
			}
		} else {
			message.channel.send(`${message.author}, you need to join a voice channel first!`)
		}
	},
}