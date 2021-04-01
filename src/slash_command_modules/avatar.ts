import { ApplicationCommandInteractionDataOptionUser } from 'discord-api-types/v8'
import { client, DiscordJS } from '../internal'
import { SlashCommand } from '../typings'

const avatar: SlashCommand = {
	description: 'Get a user\'s avatar.',
	name: 'avatar',
	async execute (interaction) {
		let TargetUser: DiscordJS.User

		if (interaction.data && interaction.data.options) {
			const UserOption = interaction.data.options.find(option => option.name === 'user') as ApplicationCommandInteractionDataOptionUser
			TargetUser = await client.users.fetch(UserOption.value.toString())
		} else {
			TargetUser = await client.users.fetch(interaction.member.user.id)
		}

		const ResponseEmbed = new DiscordJS.MessageEmbed()
		ResponseEmbed.setAuthor('Carrot Bot', 'https://raw.githubusercontent.com/TheFlyingCarrot/carrot-discord-bot/main/Carrot%20Bot.png', 'https://github.com/TheFlyingCarrot/carrot-discord-bot')
			.setTimestamp()
			.setTitle(`${TargetUser.username}'s Avatar`)
			.setThumbnail(TargetUser.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
			.setFooter(`Carrot Bot${process.env.NODE_ENV === 'test' ? ' | Test Build' : ''}`)
		return {
			type: 3,
			data: {
				embeds: [ResponseEmbed]
			}
		}
	}
}

export default avatar as SlashCommand
