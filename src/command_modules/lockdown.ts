import { Command } from '../internal.js'

const IgnoredChannels = new Set([
	'751250239897469049', '785786109208428564', '750498579797377196', '750499239171457064', '750505158043107509',
	'442002580764360715', '442004978111086592', '731313604493574145', '743672339446628403'
])

const lockdown: Command = {
	name: 'lockdown',
	description: 'Lockdown the server.',
	enabled: false,
	toggleable: true,

	aliases: ['lock-down'],
	usage: '[true/false/null]',
	args: true,
	cooldown: 30,

	guildOnly: true,
	guildSpecific: ['442001192655257620'],

	permission: 'ADMINISTRATOR',

	execute ({ args, message }) {
		let flag: boolean = null
		{
			const flagString = args.pop()
			flagString.toLowerCase() === 'true' ? true : flagString.toLowerCase() === 'false' ? false : null
		}
		const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category')
		channels.forEach(channel => {
			if (!IgnoredChannels.has(channel.id)) {
				channel.updateOverwrite(message.guild.roles.everyone.id, { SEND_MESSAGES: flag === null ? null : !flag }, `Lockdown by: ${message.author.tag}`)
					.then(guildChannel => {
						if (flag) {
							if (!guildChannel.name.endsWith('🔒')) guildChannel.edit({ name: `${guildChannel.name} 🔒` }, `Lockdown by: ${message.author.tag}`)
						} else {
							guildChannel.edit({ name: guildChannel.name.replace(/\s*🔒/u, '') }, `Lockdown by: ${message.author.tag}`)
						}
					})
					.catch((error) => console.error(error))
			} else {
				console.log(`[Lockdown] Skipping channel: [${channel.name}]:[${channel.id}]`)
			}
		})
	}
}

export default lockdown as Command
