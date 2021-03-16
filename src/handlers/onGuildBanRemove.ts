import { DiscordJS } from '../internal'

export async function onGuildBanRemove (guild: DiscordJS.Guild, _user: DiscordJS.User): Promise<void> {
	if (!guild.available) throw new Error('Guild not available.')

	const EventLog = (await guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN_REMOVE' })).entries.first()
	if (!EventLog) throw new Error('No MEMBER_BAN_REMOVE log found.')
	if (EventLog.action !== 'MEMBER_BAN_REMOVE') return

	const LogChannel = guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as DiscordJS.TextChannel
	if (!LogChannel) return

	const { executor, target } = EventLog

	if (typeof target !== 'object' || target.constructor !== DiscordJS.User) return

	const ResponseEmbed = new DiscordJS.MessageEmbed()
	ResponseEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
		.setTimestamp()
		.setThumbnail(executor.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
		.setColor('#00ff00')
		.setTitle('Member Unbanned')
		.addField('Target', `${target}`, true)
		.addField('Executor', `${executor}`, true)
		.setFooter(`Target User ID: ${target.id} | Executor ID: ${executor.id}${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	if (EventLog.reason) ResponseEmbed.addField('Reason', EventLog.reason, true)

	LogChannel.send(ResponseEmbed)
}