const fs = require('fs')
module.exports = {
	read(guild) {
        console.log('___readGuildData.js')
		if (fs.existsSync(`./guilds/${guild.id}.json`)) {
            console.log(`Guild ID File Found for Guild ID: ${guild.id}`)
            const guildFile = JSON.parse(fs.readFileSync(`./guilds/${guild.id}.json`))
            try {
                console.log(`DISCORD\nName: ${guild.name}\nID: ${guild.id}`)
                console.log(`FILESYSTEM\nName: ${guildFile.name}\nID: ${guildFile.id}\nAdmin Role ID: ${guildFile.adminRoleID}\nMod Role ID: ${guildFile.modRoleID}`)
                return [true, guildFile]
            } catch (err) {
                console.log(err)
                return [false, null]
            }
        } else {
            console.log(`No file found: ${guild.id}`)
            return [false, null]
        }
	},
}