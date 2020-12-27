import { client, Command, Discord } from '../internal'

client.getCommand = (commandName: string): Command => {
	const command: Command = client.commands.get(commandName) || client.commands.find((command: Command) => command.aliases.includes(commandName))
	return command
}