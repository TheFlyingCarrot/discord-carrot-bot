import { DiscordJS } from '../internal'

const EventName = 'MESSAGE_DELETE'

export async function onMessageDeletion (message: DiscordJS.Message): Promise<void> {
	const { guild } = message
	// Message most likely originates from a Direct Message, no implementation.
	if (!guild) return
	if (!guild.available) throw new Error('Guild not available.')
	if (message.channel.type === 'dm' || message.channel.name === 'logs') return

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
		.setTitle('Message Deleted')
		.addField('Author', `${message.author}`, true)
		.addField('Channel', `${message.channel}`, true)
		.addField('Executor', target.id === message.author.id ? executor : `Unknown (${message.author})`, true)
		.addField('Message', message.cleanContent || '`Message was an embed.`')
		.setFooter(`Message ID: ${message.id} | Author ID: ${message.author.id}${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	if (EventLog.reason) ResponseEmbed.addField('Reason', EventLog.reason, true)

	LogChannel.send(ResponseEmbed)
}