import { DiscordJS } from '../internal'

const webhookActionMap = { 'WEBHOOK_CREATE': 'Create Webhook', 'WEBHOOK_UPDATE': 'Update Webhook', 'WEBHOOK_DELETE': 'Delete Webhook' }
const embedActions = { 'CREATE': '#00ff00', 'DELETE': '#ff0000', 'UPDATE': '#ff6400', 'ALL': '#ff00ff' }
const EventName = 'WEBHOOK_UPDATE'

export async function onWebhookUpdate (channel: DiscordJS.TextChannel): Promise<void> {
	const { guild } = channel
	// Message most likely originates from a Direct Message, no implementation.
	if (!guild) return
	if (!guild.available) throw new Error('Guild not available.')
	if (channel.name === 'logs') return

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
		.setColor(embedActions[EventLog.actionType] || '#ff6400')
		.setTitle('Webhook Updated')
		.addField('Executor', `${executor}`, true)
		.addField('Channel', `${channel}`, true)
		.addField('Action', webhookActionMap[EventLog.action] || 'Unknown')
		.setFooter(`Executor ID: ${executor.id} ${process.env.NODE_ENV === 'test' ? '| Test Build' : ''}`)
	if (EventLog.reason) ResponseEmbed.addField('Reason', EventLog.reason, true)
	EventLog.changes.forEach(change => {
		if (change.old && change.new) {
			ResponseEmbed.addField('Change', `Key: ${change.key}\nOld: ${change.old}\nNew: ${change.new}`, true)
		} else if (change.new) {
			ResponseEmbed.addField('Change', `Key: ${change.key}\nValue: ${change.new}`, true)
		} else if (change.old) {
			ResponseEmbed.addField('Change', `Key: ${change.key}\nValue: ${change.old}`, true)
		}
	})

	LogChannel.send(ResponseEmbed)
}
