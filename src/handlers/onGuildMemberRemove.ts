import { client, config, DiscordJS } from '../internal'

export async function onGuildMemberRemove (member: DiscordJS.GuildMember): Promise<void> {
	const now = Date.now()

	if (!member.guild.available) return

	const eventLog = (await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_KICK' })).entries.first()

	if (!eventLog) {
		console.log(`User: ${member.user.tag} was removed, but no relevant audit logs were found.`)
		// TODO: Check: User left the Guild?
		return
	}

	if ((eventLog.createdTimestamp - now) >= config.log_tolerance_ms) {
		console.log(`User: ${member.user.tag} was removed, but no recent log from the time of the event trigger was found.`)
		return
	} else if (eventLog.action !== 'MEMBER_KICK') {
		return
	}

	const logChannel = member.guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as DiscordJS.TextChannel
	if (!logChannel) return

	const { executor, target } = eventLog

	if (typeof target != 'object' || target.constructor != DiscordJS.User) {
		client.emit('warn', `${__filename} Invalid log detected.`)
		return
	}

	const newEmbed = new DiscordJS.MessageEmbed()
	newEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
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