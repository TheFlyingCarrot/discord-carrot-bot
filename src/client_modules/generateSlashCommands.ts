import { Collection } from 'discord.js'
import { fs, path } from '../internal'
import { SlashCommand } from '../typings'

const commandModulesPath = path.join(process.cwd(), 'dist/slash_command_modules')

export function generateSlashCommands (): Collection<string, SlashCommand> {
	const slashCommands = new Collection<string, SlashCommand>()
	for (const file of fs.readdirSync(commandModulesPath)) {
		const commandPath = path.join(commandModulesPath, `${file}`)
		const command: SlashCommand = require(commandPath).default
		slashCommands.set(command.name, command)
	}
	return slashCommands
}
