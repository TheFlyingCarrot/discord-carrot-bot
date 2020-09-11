const Validate_Flag = Flag => Flag === 'true' || Flag === 'false' || Flag === 'null'

const Ignored_Channels = new Set([
	750499239171457064, 750505158043107509, 750498579797377196,
	442002580764360715, 442004978111086592, 731313604493574145, 731299966341087273,
])

module.exports = {
	enabled: true,
	canToggle: true,
	name: 'lockdown',
	aliases: ['lock-down'],
	usage: '[true/false/null]',
	args: true,
	description: 'Lockdown the server.',
	cooldown: 30,
	guildOnly: true,
	permission: 'ADMINISTRATOR',
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) {
			message.channel.send(`${message.author}, you do not have permission to use that command.`)
			return null
		}
		if (!Validate_Flag(args[0])) {
			message.channel.send(`${message.author}, you did not provide a valid flag.`)
			return null
		}
		const flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null)
		const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category')
		channels.forEach(channel => {
			if (!Ignored_Channels.has(channel.id)) {
				channel.updateOverwrite(message.guild.roles.everyone.id, {
					SEND_MESSAGES: flag === null ? null : !flag,
				}, `Lockdown by: ${message.author.tag}`)
					.then(guildChannel => {
						if (flag) {
							if (!guildChannel.name.endsWith('🔒')) {
								guildChannel.edit({
									name: guildChannel.name + ' 🔒',
								}, `Lockdown by: ${message.author.tag}`)
							}
						} else {
							guildChannel.edit({
								name: guildChannel.name.replace(/\s*🔒/, ''),
							}, `Lockdown by: ${message.author.tag}`)
						}
					})
					.catch(err => console.log(err))
			} else {
				console.log(`Skipping channel: [${channel.name}]:[${channel.id}]`)
			}
		})
	},
}
