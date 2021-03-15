import { client, getSlashCommand } from '../internal'

function respond (interaction, commandData) {
	console.log(commandData)
	if (!commandData.data) commandData.data = {}
	client.api.interactions(interaction.id, interaction.token).callback.post({
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
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function onInteractionCreate (interaction) {

	const Command = getSlashCommand(interaction.data.name)
	if (!Command) return

	const CommandData = await Command.execute(interaction)
	if (!CommandData) return

	respond(interaction, CommandData)
}
