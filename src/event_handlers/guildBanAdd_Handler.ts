import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Collection, Message, MessageEmbed } from '../internal.js'
import { ClientUser } from 'discord.js'

export async function handleGuildBanAdd (guild: Discord.Guild, user: Discord.User) {
	if (!guild.available) return

	const logChannel = guild.channels.cache.find(channel => channel.name === "logs" && channel.type === "text") as Discord.TextChannel
	if (!logChannel) return

	try {
		const fetchedLogs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" })
		const banAddLog = fetchedLogs.entries.first()

		const { executor, reason } = banAddLog

		const newEmbed = new MessageEmbed()

		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setThumbnail(executor.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
			.setColor("#ff0000")
			.setTitle('User Banned')
			.addField("Banned User", user.tag)
			.addField("Executor", executor || "Unknown", true)
			.addField("Reason", reason || "Unspecified", true)
			.setFooter(`User ID: ${user.id} | Executor ID: ${executor.id} ${process.env.ENV_TYPE == 'test' ? '| Test Build' : ''}`)

		logChannel.send(newEmbed)
	} catch (error) {
		console.error(error)
	}
}