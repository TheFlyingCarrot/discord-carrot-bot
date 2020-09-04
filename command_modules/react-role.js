module.exports = {
	enabled: false,
	canToggle: false,
	name: 'react-role',
	usage: '[message]',
	args: true,
	description: 'Message the admins.',
	cooldown: 10,
	guildOnly: true,
	developerOnly: true,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		//
	},
}