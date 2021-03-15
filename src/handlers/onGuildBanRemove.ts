import { client, DiscordJS } from '../internal'

export async function onGuildBanRemove (guild: DiscordJS.Guild, user: DiscordJS.User): Promise<void> {
	if (!guild.available) return

	const eventLog = (await guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN_REMOVE' })).entries.first()
	if (!eventLog) {
		console.log(`User: ${user.tag} was banned, but no relevant audit logs were found.`)
		return
	}
	if (eventLog.action != 'MEMBER_BAN_REMOVE') return

	const logChannel = guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as DiscordJS.TextChannel
	if (!logChannel) return

	const { executor, target } = eventLog

	if (typeof target != 'object' || target.constructor != DiscordJS.User) {
		client.emit('warn', `${__filename} Invalid log detected.`)
		return
	}

	const newEmbed = new DiscordJS.MessageEmbed()
	newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
		.setTimestamp()
		.setThumbnail(executor.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
		.setColor('#00ff00')
		.setTitle('Member Unbanned')
		.addField('Target', `${target}`, true)
		.addField('Executor', `${executor}`, true)
		.setFooter(`Target User ID: ${target.id} | Executor ID: ${executor.id}${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	if (eventLog.reason) newEmbed.addField('Reason', eventLog.reason, true)

	logChannel.send(newEmbed)
}