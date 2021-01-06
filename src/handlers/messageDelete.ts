import { client, Discord } from '../internal.js'

export async function onMessageDeletion (message: Discord.Message) {
	if (client.events.messageDelete === false || message.channel.type === 'dm' || message.channel.name === 'logs' || !message.guild || !message.guild.available) return

	const eventLog: Discord.GuildAuditLogsEntry = (await message.guild.fetchAuditLogs({ limit: 1, type: 'MESSAGE_DELETE' })).entries.first()
	if (!eventLog) {
		console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`)
		return
	}
	if (eventLog.action != 'MESSAGE_DELETE') return

	const logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as Discord.TextChannel
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
		.setTitle('Message Deleted')
		.addField('Author', `${message.author}`, true)
		.addField('Channel', `${message.channel}`, true)
		.addField('Executor', target.id === message.author.id ? executor : `Unknown (${message.author})`, true)
		.addField('Message', message.cleanContent || '`Message was an embed.`')
		.setFooter(`Message ID: ${message.id} | Author ID: ${message.author.id}${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	if (eventLog.reason) newEmbed.addField('Reason', eventLog.reason, true)

	logChannel.send(newEmbed)
}