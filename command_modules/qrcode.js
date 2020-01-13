const QRCode = require('qrcode')
if (!Array.prototype.last) {
	Array.prototype.last = function() {
		return this[this.length - 1]
	}
}
module.exports = {
	name: 'qrcode',
	aliases: ['qr', 'q'],
	usage: '[link]',
	description: 'Generate a QR code.',
	cooldown: 30,
	execute(itemTable) {
		const { client, message, args, templateEmbed } = itemTable
		if (!args) {
			return null
		} else {
			let argStitch = ''
			args.forEach(arg => {
				argStitch += ((args[args.length - 1] === arg) ? (`${arg}`) : (`${arg} `))
				console.log(argStitch)
			})
			QRCode.toFile(`./qrcodes/${message.author.id}.png`, String(argStitch), {
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
				.addField('**Conents**', argStitch)
				.attachFile(`./qrcodes/${message.author.id}.png`)
			message.channel.send(newEmbed)
		}
	},
}