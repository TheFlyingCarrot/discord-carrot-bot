import { client, Command } from '../internal'

export function getCommand (commandName: string): Command | null {
	return (client.commands.get(commandName) || client.commands.find((command) => command.aliases ? command.aliases.includes(commandName) : false)) ?? null
}
