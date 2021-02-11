import { Command, ClientEvents, Discord, ClientModules, Config } from '../internal'

export class ExtendedClient extends Discord.Client {
	activity: string
	commands: Discord.Collection<string, Command>
	commandsEnabled: boolean
	cooldowns: Discord.Collection<string, Discord.Collection<string, number>>
	events: ClientEvents

	constructor (activity: string, options: Discord.ClientOptions) {
		super(options)
		this.activity = activity
		this.commands = new Discord.Collection()
		this.commandsEnabled = Config.default_commands_enabled
		this.cooldowns = new Discord.Collection()
		this.events = Config.client_events
	}

	getCommand = ClientModules.getCommand
	parseCommandFromMessage = ClientModules.parseCommandFromMessage
}
