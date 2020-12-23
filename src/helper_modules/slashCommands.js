import { client } from '../internal'

export function slashCommands () {
	console.log('slashCommands.js init')

	client.api.applications(client.user.id).commands.post({
		data: {
			name: 'ping',
			description: 'Pong!'
		}
	})

	client.ws.on('INTERACTION_CREATE', async interaction => {
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'Hello World!'
				}
			}
		})
	})
}
