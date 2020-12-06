import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const Valid_Flags = [true, false, null]

const Ignored_Channels = new Set([
	'750499239171457064', '750505158043107509', '750498579797377196',
	'442002580764360715', '442004978111086592', '731313604493574145', '731299966341087273'
])

const lock_down: Command = {
	name: 'lock-down',
	description: 'Lockdown the server.',
	enabled: true,
	toggleable: true,

	aliases: ['lockdown'],
	usage: '[true/false/null]',
	args: true,
	cooldown: 30,

	guildOnly: true,
	guildSpecific: ['442001192655257620'],

	permission: 'ADMINISTRATOR',

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		const flag = args[0].toLowerCase() === 'true' ? true : args[0].toLowerCase() === 'false' ? false : null
		const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category')
		channels.forEach(channel => {
			if (!Ignored_Channels.has(channel.id)) {
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

export default lock_down as Command
