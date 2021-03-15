import { client } from '../internal'

export function onReady (): void {
	console.debug('[Client] [State] Ready')
	client.commands_enabled ? client.user.setStatus('online') : client.user.setStatus('dnd')
	setInterval(() => {
		client.user.setActivity(client.activity, { type: 'LISTENING' })
			.catch(console.error)
	}, 600000)
}
