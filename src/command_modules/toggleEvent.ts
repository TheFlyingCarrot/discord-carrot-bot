import { client, Command } from '../internal.js'

const toggleEvent: Command = {
	name: 'toggleevent',
	description: 'Toggles an event trigger.',
	enabled: true,
	toggleable: false,

	aliases: ['toggle-event'],
	usage: '[event/all]',
	args: true,

	developerOnly: true,

	execute ({ args, message }) {
		const desiredEvent = args.pop()
		if (desiredEvent in client.events) {
			client.events[desiredEvent] = !client.events[desiredEvent]
		} else if (desiredEvent === 'all') {
			for (const event in client.events) {
				if (Object.prototype.hasOwnProperty.call(client.events, event)) {
					client.events[event] = !client.events[event]
					console.log(`[Event Status] ${event} ${client.events[event] ? 'Enabled' : 'Disabled'}`)
				}
			}
		} else {
			message.reply('I could not find that event. Possible arguments include: `' + Object.keys(client.events).join('`, `') + '`, `all`.')
		}
	}
}

export default toggleEvent as Command
