const QRCode = require('qrcode')

module.exports = {
	enabled: true,
	canToggle: true,
	name: 'qrcode',
	aliases: ['qr'],
	usage: '[message/link to encode]',
	description: 'Generate a QR code.',
	cooldown: 30,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		if (!args) {
			return null
		} else {
			const argStitch = args.join(' ')
			QRCode.toFile(`./dump/qr_codes/${message.author.id}.png`, String(argStitch), {
				color: {
					dark: '#F00',
					light: '#0000',
				},
			}).then(() => {
				const newEmbed = templateEmbed
					.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
					.setThumbnail('https://i.ibb.co/VTS5PXk/user-write.png')
					.setTimestamp()
					.setTitle('QR Code')
					.addField('**Contents**', argStitch)
					.attachFile(`./qrcodes/${message.author.id}.png`)
					.setImage(`attachment://${message.author.id}.png`)
				message.channel.send(newEmbed)
			})
		}
	},
}
