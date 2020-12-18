import { client, Discord } from '../internal.js'

export async function onMessageUpdate (oldMessage: Discord.Message, newMessage: Discord.Message): Promise<void> {
	if (client.events.messageUpdate === false || oldMessage.channel.type === 'dm' || oldMessage.channel.name === 'logs' || !newMessage.guild.available) return

	const logChannel = oldMessage.guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as Discord.TextChannel
	if (!logChannel) return

	if (oldMessage.partial) await oldMessage.fetch()
	if (newMessage.partial) await newMessage.fetch()

	if (!newMessage.cleanContent) return

	const newEmbed = new Discord.MessageEmbed()
	newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
		.setTimestamp()
		.setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
		.setColor('#ff6400')
		.setTitle('Message Updated')
		.addField('Author', `${newMessage.author}`, true)
		.addField('Channel', `${newMessage.channel}`, true)
		.addField(oldMessage.content ? 'Old Message' : 'Old Message __(Not Retrieved)__', oldMessage.cleanContent ? oldMessage.cleanContent : 'Unknown')
		.addField('New Message', newMessage.cleanContent)
		.setFooter(`Message ID: ${newMessage.id} | Author ID: ${newMessage.author.id || 'Null'}${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)

	logChannel.send(newEmbed)
}
