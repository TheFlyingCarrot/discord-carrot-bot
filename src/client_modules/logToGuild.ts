import { DiscordJS } from '../internal'

const DefaultEmbedColor: DiscordJS.ColorResolvable = '#ff6400'

export function logToGuild (guild: DiscordJS.Guild, log: string, color?: DiscordJS.ColorResolvable): void {
	if (!guild.available) return
	const logChannel = guild.channels.cache.find(channel => channel.name === 'logs')
	if (!logChannel || !logChannel.isText()) return

	const newEmbed = new DiscordJS.MessageEmbed()
	newEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
		.setTimestamp()
		.setColor(color || DefaultEmbedColor)
		.setTitle('Event Log')
		.setDescription(log)
		.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
	logChannel.send(newEmbed)
}
