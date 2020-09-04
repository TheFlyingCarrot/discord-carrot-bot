module.exports = {
	enabled: true,
	canToggle: true,
	name: 'mod-mail',
	aliases: ['mm', 'modmail', 'admin-mail', 'adminmail'],
	usage: '[message]',
	args: true,
	description: 'Message the admins.',
	cooldown: 45,
	guildOnly: true,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		const guild = message.guild

		if (message.guild.id == '750480529765171302') {
			message.delete({ reason: 'Mod-mail.' })
			const modMail = args.join(' ')
			guild.publicUpdatesChannel.send(`<@&750486984987770881>, ${message.author} sent: ${modMail}`)
		} else {
			return null
		}
	},
}