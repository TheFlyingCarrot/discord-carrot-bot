import { Command, Discord, fs, path } from '../internal'
import { client } from '../internal'

export function initalizeCommands (): Discord.Collection<string, Command> {
	const commands = new Discord.Collection<string, Command>()
	for (const file of fs.readdirSync(path.join(process.cwd(), 'dist/command_modules'))) {
		if (!file.endsWith('.js'))
			continue
		const commandPath = path.join(process.cwd(), 'dist/command_modules', `${file}`)
		try {
			const command: Command = require(commandPath).default
			if (command && !client.getCommand(command.name)) commands.set(command.name, command)
		} catch (error) {
			console.error('[Command Loading Error]', `${file}: Command could not be loaded.\nError: ${error}`)
		}
	}
	return commands
}
