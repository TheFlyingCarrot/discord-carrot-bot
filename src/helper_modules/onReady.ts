import { client } from '../index'

export function onReady (): void {
	console.debug('[Client] [State] Ready')
	client.commandsEnabled ? client.user.setStatus('online') : client.user.setStatus('dnd')
	setInterval(() => {
		client.user.setActivity(client.activity, { type: 'LISTENING' })
			.catch(console.error)
	}, 600000)
}
