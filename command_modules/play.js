const fs = require('fs')
module.exports = {
	enabled: false,
	can_toggle: true,
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
				const connection = await message.member.voice.channel.join()
				// add song to queue
				// message.channel.send(`${message.author}, ${newSong} was added to the queue.`)
				if (args[0] == 'juicy') {
					const dispatcher = connection.play(fs.createReadStream('./dump/audio/juicy.ogg'), { type: 'ogg/opus', highWaterMark: 15 })
					dispatcher.on('finish', () => {
						dispatcher.destroy()
					})
				}
			}
		} else {
			message.channel.send(`${message.author}, you need to join a voice channel first!`)
		}
	},
}