import { client, Discord } from '../internal.js'

export async function onGuildBanRemove (guild: Discord.Guild, user: Discord.User): Promise<void> {
	if (client.events.messageDelete === false || !guild.available) return

	const eventLog: Discord.GuildAuditLogsEntry = (await guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN_REMOVE' })).entries.first()
	if (!eventLog) return console.log(`User: ${user.tag} was banned, but no relevant audit logs were found.`)
	if (eventLog.action != 'MEMBER_BAN_REMOVE') return

	const logChannel = guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as Discord.TextChannel
	if (!logChannel) return

	const { executor, target } = eventLog

	if (typeof target != 'object' || target.constructor != Discord.User) {
		client.emit('warn', `${__filename} Invalid log detected.`)
		return
	}

	const newEmbed = new Discord.MessageEmbed()
	newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
		.setTimestamp()
		.setThumbnail(executor.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
		.setColor('#ff0000')
		.setTitle('Member Unbanned')
		.addField('Target', `${target}`, true)
		.addField('Executor', `${executor}`, true)
		.setFooter(`Target User ID: ${target.id} | Executor ID: ${executor.id}${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)
	if (eventLog.reason) newEmbed.addField('Reason', eventLog.reason, true)

	logChannel.send(newEmbed)
}