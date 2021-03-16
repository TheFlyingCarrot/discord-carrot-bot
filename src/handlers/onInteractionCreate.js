import { client, getSlashCommand } from '../internal'

export async function onInteractionCreate (interaction) {
	const Command = getSlashCommand(interaction.data.name)
	if (!Command) throw new Error('No command found.')

	const CommandData = await Command.execute(interaction)
	if (!CommandData) throw new Error('Command produced no data.')
	if (!CommandData.data) CommandData.data = {}

	await client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: CommandData.type ?? 2,
			data: {
				tts: CommandData.data.tts ?? false,
				content: CommandData.data.content ?? null,
				embeds: CommandData.data.embeds ?? null,
				allowed_mentions: CommandData.data.allowed_mentions ?? null,
				flags: CommandData.data.flags ?? null
			}
		}
	})
}
