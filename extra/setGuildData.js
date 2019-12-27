const fs = require('fs')
module.exports = {
	write(guild, newData) {
        console.log('setGuildData.js')
		if ((newData) && (fs.existsSync(`./guilds/${guild.id}.json`))) {
            console.log(`Guild ID File Found for Guild ID: ${guild.id}`)
            const guildFile = JSON.parse(fs.readFileSync(`./guilds/${guild.id}.json`))
            try {
                console.log(`DISCORD\nName: ${guild.name}\nID: ${guild.id}`)
                console.log(`FILESYSTEM\nName: ${guildFile.name}\nID: ${guildFile.id}\nAdmin Role ID: ${guildFile.adminRoleID}\nMod Role ID: ${guildFile.modRoleID}`)
                fs.writeFileSync(`./guilds/${guild.id}.json`, JSON.stringify(newData), 'utf-8')
            } catch (err) {
                console.log(err)
            }
        } else {
            const defaultData = {
                name: `${guild.name}`,
                id: `${guild.id}`,
                adminRoleID: NaN,
                modRoleID: NaN,
            }
            try {
                console.log(`DISCORD\nName: ${guild.name}\nID: ${guild.id}`)
                fs.writeFileSync(`./guilds/${guild.id}.json`, JSON.stringify(defaultData), 'utf-8')
            } catch (err) {
                console.log(err)
            }
        }
	},
}