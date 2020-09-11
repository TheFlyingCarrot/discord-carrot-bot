const debug_logger = require('../helper_modules/debug_logger')

module.exports = {
	enabled: true,
	name: 'debug',
	description: 'Toggle debug logging.',
	developerOnly: true,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		debug_logger.enabled = !debug_logger.enabled
	},
}
