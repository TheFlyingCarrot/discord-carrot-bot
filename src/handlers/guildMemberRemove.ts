import { client, Config, Discord } from '../internal.js'

export async function onGuildMemberRemove (member: Discord.GuildMember): Promise<void> {
	const now = Date.now()

	if (client.events.messageDelete === false || !member.guild.available) return

	const eventLog: Discord.GuildAuditLogsEntry = (await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_KICK' })).entries.first()
	
	if (!eventLog) {
		console.log(`User: ${member.user.tag} was removed, but no relevant audit logs were found.`)
		return
	}
	
	if ((eventLog.createdTimestamp - now) >= Config.log_tolerance_ms) {
		console.log(`User: ${member.user.tag} was removed, but no recent log from the time of the event trigger was found.`)
		return
	} else if (eventLog.action !== 'MEMBER_KICK') {
		return
	}

	const logChannel = member.guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as Discord.TextChannel
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
		.setTitle('Member Kicked')
		.addField('Target', `${target}`, true)
		.addField('Executor', executor.id, true)
		.setFooter(`Target User ID: ${target.id} | Executor ID: ${executor.id}${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	if (eventLog.reason) newEmbed.addField('Reason', eventLog.reason, true)

	logChannel.send(newEmbed)
}