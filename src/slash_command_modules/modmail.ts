import { DiscordJS, client } from '../internal'
import { SlashCommand } from '../typings'

const modmail: SlashCommand = {
	description: 'Send a message to server staff.',
	name: 'modmail',
	async execute (interaction) {
		const guild = await client.guilds.fetch(interaction.guild_id)
		if (!guild) throw new Error('Guild not found.')
		if (!guild.available) throw new Error('Guild not available.')

		const { publicUpdatesChannel } = guild
		// Guilds without the Community option enabled and/or no selected channel for public updates do not have a `publicUpdatesChannel`.
		if (!publicUpdatesChannel) return

		const Options = interaction.data.options
		// There is at least one required argument for this command.
		if (!Options) throw new Error('Interaction data did not contain expected options.')
		const ModMailMessage = String(Options.find(element => 'name' in element && element.name === 'message').value)
		if (!ModMailMessage) throw new Error('Could not find property `message` of interaction data options.')

		const ResponseEmbed = new DiscordJS.MessageEmbed()
		ResponseEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png')
			.setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
			.setTitle('Mod-Mail')
			.setTimestamp()
			.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
			.addField('Author', interaction.member.user.username)
			.addField('Message', ModMailMessage)
		publicUpdatesChannel.send(ResponseEmbed)

		return {
			type: 3,
			data: {
				content: 'Modmail recieved.',
				flags: 64
			}
		}
	}
}

export default modmail as SlashCommand
