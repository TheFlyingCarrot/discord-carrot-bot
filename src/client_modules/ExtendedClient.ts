import { ClientOptions, Collection } from 'discord.js'
import { config, DiscordJS } from '../internal'
import { Command, SlashCommand } from '../typings'

export default class ExtendedClient extends DiscordJS.Client {
	activity: string
	commands: Collection<string, Command>
	slash_commands: Collection<string, SlashCommand>
	commands_enabled: boolean
	cooldowns: Collection<string, Collection<string, number>>

	constructor (activity: string, options: ClientOptions) {
		super(options)
		this.activity = activity
		this.commands = new Collection()
		this.slash_commands = new Collection()
		this.commands_enabled = config.default_commands_enabled
		this.cooldowns = new Collection()
	}
}
