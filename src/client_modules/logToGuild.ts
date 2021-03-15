import { DiscordJS } from '../internal'

const DefaultEmbedColor: DiscordJS.ColorResolvable = '#ff6400'

export function logToGuild (guild: DiscordJS.Guild, log: string, color?: DiscordJS.ColorResolvable): void {
	if (!guild.available) return
	const logChannel = guild.channels.cache.find(channel => channel.name === 'logs')
	if (!logChannel || !logChannel.isText()) return

	const newEmbed = new DiscordJS.MessageEmbed()
	newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
		.setTimestamp()
		.setColor(color || DefaultEmbedColor)
		.setTitle('Event Log')
		.setDescription(log)
		.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	logChannel.send(newEmbed)
}
