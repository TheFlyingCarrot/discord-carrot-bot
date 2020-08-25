const QRCode = require('qrcode')
module.exports = {
	enabled: false,
	can_toggle: false,
	name: 'qrcode',
	aliases: ['qr'],
	usage: '[link]',
	description: 'Generate a QR code.',
	cooldown: 30,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		if (!args) {
			return null
		} else {
			let argStitch = ''
			args.forEach(arg => {
				argStitch += ((args[args.length - 1] === arg) ? (`${arg}`) : (`${arg} `))
			})
			QRCode.toFile(`./dump/qr_codes/${message.author.id}.png`, String(argStitch), {
				color: {
					dark: '#F00',
					light: '#0000',
				},
			})
			const newEmbed = templateEmbed
				.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/VTS5PXk/user-write.png')
				.setTimestamp()
				.setTitle('QR Code')
				.addField('**Contents**', argStitch)
				.attachFile(`./qrcodes/${message.author.id}.png`)
				.setImage(`attachment://${message.author.id}.png`)
			message.channel.send(newEmbed)
		}
	},
}