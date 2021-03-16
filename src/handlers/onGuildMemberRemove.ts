import { DiscordJS } from '../internal'

export async function onGuildMemberRemove (member: DiscordJS.GuildMember): Promise<void> {
	if (!member.guild.available) return

	const EventLog = (await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_KICK' })).entries.first()
	// No error because this could also mean that a user has left the guild.
	if (!EventLog) return
	if (EventLog.action !== 'MEMBER_KICK') return

	const LogChannel = member.guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as DiscordJS.TextChannel
	if (!LogChannel) return

	const { executor, target } = EventLog

	if (typeof target !== 'object' || target.constructor !== DiscordJS.User) return

	const ResponseEmbed = new DiscordJS.MessageEmbed()
	ResponseEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
		.setTimestamp()
		.setThumbnail(executor.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
		.setColor('#ff0000')
		.setTitle('Member Kicked')
		.addField('Target', `${target}`, true)
		.addField('Executor', executor.id, true)
		.setFooter(`Target User ID: ${target.id} | Executor ID: ${executor.id}${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	if (EventLog.reason) ResponseEmbed.addField('Reason', EventLog.reason, true)

	LogChannel.send(ResponseEmbed)
}