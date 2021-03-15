import { DiscordJS } from '../internal'

export async function onMessageUpdate (oldMessage: DiscordJS.Message, newMessage: DiscordJS.Message): Promise<void> {
	if (oldMessage.channel.type === 'dm' || oldMessage.channel.name === 'logs' || !newMessage.guild.available) return

	const logChannel = oldMessage.guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as DiscordJS.TextChannel
	if (!logChannel) return

	if (oldMessage.partial) await oldMessage.fetch()
	if (newMessage.partial) await newMessage.fetch()

	if (!newMessage.cleanContent || oldMessage.cleanContent === newMessage.cleanContent) return

	const newEmbed = new DiscordJS.MessageEmbed()
	newEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
		.setTimestamp()
		.setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
		.setColor('#ff6400')
		.setTitle('Message Updated')
		.addField('Author', `${newMessage.author}`, true)
		.addField('Channel', `${newMessage.channel}`, true)
		.addField(oldMessage.content ? 'Old Message' : 'Old Message __(Not Retrieved)__', oldMessage.cleanContent ? oldMessage.cleanContent : 'Unknown')
		.addField('New Message', newMessage.cleanContent)
		.setFooter(`Message ID: ${newMessage.id} | Author ID: ${newMessage.author.id || 'Null'}${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)

	logChannel.send(newEmbed)
}
