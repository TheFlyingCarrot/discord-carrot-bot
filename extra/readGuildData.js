const fs = require('fs')
module.exports = {
	read(guild) {
		if (fs.existsSync(`./guilds/${guild.id}.json`)) {
            const guildFile = JSON.parse(fs.readFileSync(`./guilds/${guild.id}.json`))
            try {
                return [true, guildFile]
            } catch (err) {
                console.log(err)
                return [false, null]
            }
        } else {
            return [false, null]
        }
	},
}