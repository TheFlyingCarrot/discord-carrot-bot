import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Collection, Message, MessageEmbed } from '../internal.js'
import { ClientUser } from 'discord.js'

export async function handleMessageDeletion (message: Message) {
	if (message.channel.type === "dm" || message.channel.name === "logs" || !message.guild.available) return

	const logChannel = message.guild.channels.cache.find(channel => channel.name === "logs" && channel.type === "text") as Discord.TextChannel
	if (!logChannel) return

	try {
		const fetchedLogs = await message.guild.fetchAuditLogs({ limit: 1, type: "MESSAGE_DELETE" })
		const deletionLog = fetchedLogs.entries.first()

		const { author, channel, content, embeds, id } = message
		const { executor, reason } = deletionLog

		const newEmbed = new MessageEmbed()

		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setColor("#ff0000")
			.setTitle('Message Deleted')
			.addField(`Author`, `${author}`, true)
			.addField(`Channel`, `${channel}`, true)
			.addField("Message", content || embeds.toString() || "")
			.addField("Executor", executor || "Unknown", true)
			.addField("Reason", reason || "Unspecified", true)
			.setFooter(`Message ID: ${id} | Author ID: ${author.id}`)

		logChannel.send(newEmbed)
	} catch (error) {
		console.error(error)
	}
}