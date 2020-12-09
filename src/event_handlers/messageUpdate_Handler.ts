import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Collection, Message, MessageEmbed } from '../internal.js'
import { ClientUser, NewsChannel } from 'discord.js'

export async function handleMessageUpdate (oldMessage: Message, newMessage: Message) {
	if (oldMessage.channel.type === "dm" || oldMessage.channel.name === "logs" || oldMessage.embeds || newMessage.embeds || !oldMessage.guild.available) return

	const logChannel = oldMessage.guild.channels.cache.find(channel => channel.name === "logs" && channel.type === "text") as Discord.TextChannel
	if (!logChannel) return

	try {

		if (!newMessage.author || !newMessage.channel || !newMessage.cleanContent || !newMessage.id) return

		if (oldMessage.partial) await oldMessage.fetch()
		if (newMessage.partial) await newMessage.fetch()

		const newEmbed = new MessageEmbed()

		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
			.setColor('#ff6400')
			.setTitle('Message Updated')
			.addField(`Author`, `${newMessage.author}`, true)
			.addField(`Channel`, `${newMessage.channel}`, true)
			.addField(oldMessage.content != null ? 'Old Message' : 'Old Message | __Not Retrieved__', oldMessage.cleanContent)
			.addField('New Message', newMessage.cleanContent)
			.setFooter(`Message ID: ${newMessage.id} | Author ID: ${newMessage.author.id || 'Null'}${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)

		logChannel.send(newEmbed)
	} catch (error) {
		console.error(error)
	}
}
