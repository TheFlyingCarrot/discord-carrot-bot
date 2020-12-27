import { client, Command } from '../internal'

client.hasCommand = (commandName: string): boolean => {
	if (client.commands.get(commandName))
		return true
	else if (client.commands.find((command: Command) => command.aliases.includes(commandName)))
		return true
	else
		return false
}
