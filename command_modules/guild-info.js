module.exports = {
	enabled: true,
	name: 'guild-info',
	usage: '[guild id]',
	description: 'Generate a JSON list of information for a server.',
	guildOnly: true,
	developerOnly: true,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		console.log(message.guild)
	},
}
