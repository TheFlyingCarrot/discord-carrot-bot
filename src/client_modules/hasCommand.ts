import { client, Command } from '../internal'

export function hasCommand (commandName: string): boolean {
	if (client.commands.get(commandName)
		|| client.commands.find((command: Command) => command.aliases ? command.aliases.includes(commandName) : false))
		return true
	else
		return false
}
