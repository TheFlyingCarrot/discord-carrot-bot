import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Collection, Message, MessageEmbed } from '../internal.js'
import { ClientUser } from 'discord.js'

export async function handleGuildMemberRemove (member: Discord.GuildMember) {
	if (!member.guild.available) return

	const logChannel = member.guild.channels.cache.find(channel => channel.name === "logs" && channel.type === "text") as Discord.TextChannel
	if (!logChannel) return

	try {
		const fetchedLogs = await member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" })
		const kickLog = fetchedLogs.entries.first()

		const { executor, reason } = kickLog

		const newEmbed = new MessageEmbed()

		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setColor("#ff0000")
			.setTitle('Member Kicked')
			.addField("Removed Member", member.user.tag)
			.addField("Executor", executor || "Unknown", true)
			.addField("Reason", reason || "Unspecified", true)
			.setFooter(`Member ID: ${member.id} | Executor ID: ${executor.id} ${process.env.ENV_TYPE == 'test' ? '| Test Build' : ''}`)

		logChannel.send(newEmbed)
	} catch (error) {
		console.error(error)
	}
}