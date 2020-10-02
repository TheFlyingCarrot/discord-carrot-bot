module.exports = {
	enabled: true,
	canToggle: true,
	name: 'source',
	aliases: ['sourcecode', 'github', 'repository'],
	description: 'View my GitHub repository.',
	execute (dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		const newEmbed = templateEmbed
			.setAuthor('TheFlyingCarrot', 'https://avatars2.githubusercontent.com/u/32348022?s=460&u=8ae440138c2f4e729ca6f41fc9e057732da3a177&v=4')
			.setThumbnail('https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.addField('Carrot Bot Repository', 'https://github.com/TheFlyingCarrot/discord-carrot-bot')
		message.channel.send(newEmbed)

		return null
	}
}
