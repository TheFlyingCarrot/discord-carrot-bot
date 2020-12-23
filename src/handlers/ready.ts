import { slashCommands } from '../helper_modules/slashCommands'
import { client } from '../index'

export function onReady (): void {
	console.debug('[Client] [State] Ready')
	client.commandsEnabled ? client.user.setStatus('online') : client.user.setStatus('dnd')
	// testing slash command implementation
	slashCommands()
	setInterval(() => {
		client.user.setActivity(client.activity, { type: 'LISTENING' })
			.catch(console.error)
	}, 600000)
}
