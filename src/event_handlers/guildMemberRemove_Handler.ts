import { client, Discord } from '../internal.js'

export async function handleGuildMemberRemove (member: Discord.GuildMember): Promise<void> {
	if (!member.guild.available) return

	if (client.events.guildMemberRemove === false) return

	const logChannel = member.guild.channels.cache.find(channel => channel.name === 'logs' && channel.type === 'text') as Discord.TextChannel
	if (!logChannel) return

	try {
		const fetchedLogs = await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_KICK' })
		const kickLog = fetchedLogs.entries.first()

		const { executor, reason } = kickLog

		const newEmbed = new Discord.MessageEmbed()

		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setThumbnail(executor.displayAvatarURL({ dynamic: true, format: 'png', size: 256 }))
			.setColor('#ff0000')
			.setTitle('Member Kicked')
			.addField('Removed Member', member.user.tag)
			.addField('Executor', executor || 'Unknown', true)
			.addField('Reason', reason || 'Unspecified', true)
			.setFooter(`Member ID: ${member.id} | Executor ID: ${executor.id}${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)

		logChannel.send(newEmbed)
	} catch (error) {
		console.error(error)
	}
}