import { client, getSlashCommand } from '../internal'

async function respond (interaction, commandData) {
	if (!commandData.data) commandData.data = {}
	await client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: commandData.type ?? 2,
			data: {
				tts: commandData.data.tts ?? false,
				content: commandData.data.content ?? null,
				embeds: commandData.data.embeds ?? null,
				allowed_mentions: commandData.data.allowed_mentions ?? null,
				flags: commandData.data.flags ?? null
			}
		}
	})
	// Followup Webhook - TBUL
	/* client.api.webhooks(client.user.id, interaction.token).post({
		contentType: 'application/json',
		data: {
			content: 'Test'
		}
	}) */
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function onInteractionCreate (interaction) {

	const Command = getSlashCommand(interaction.data.name)
	if (!Command) return

	const CommandData = await Command.execute(interaction)
	if (!CommandData) return

	respond(interaction, CommandData)
}
