import { DiscordJS } from '../internal'

const EventName = 'MEMBER_BAN_ADD'

export async function onGuildBanAdd (guild: DiscordJS.Guild, _user: DiscordJS.User): Promise<void> {
	if (!guild.available) throw new Error('Guild not available.')

	const EventLog = (await guild.fetchAuditLogs({ limit: 1, type: EventName })).entries.first()
	if (!EventLog) throw new Error(`No ${EventName} log found.`)
	if (EventLog.action !== EventName) return

	const LogChannel = guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as DiscordJS.TextChannel
	if (!LogChannel) return

	const { executor, target } = EventLog

	if (typeof target !== 'object' || target.constructor !== DiscordJS.User) return

	const ResponseEmbed = new DiscordJS.MessageEmbed()
	ResponseEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
		.setTimestamp()
		.setThumbnail(executor.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
		.setColor('#ff0000')
		.setTitle('Member Banned')
		.addField('Target', `${target}`, true)
		.addField('Executor', executor.id, true)
		.setFooter(`Target User ID: ${target.id} | Executor ID: ${executor.id}${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	if (EventLog.reason) ResponseEmbed.addField('Reason', EventLog.reason, true)

	LogChannel.send(ResponseEmbed)
}
