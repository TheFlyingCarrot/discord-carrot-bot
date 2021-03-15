import { client } from '../internal'
import { SlashCommand } from '../typings'

export function getSlashCommand (commandName: string): SlashCommand | null {
	return client.slash_commands.get(commandName) ?? null
}
