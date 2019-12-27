const fs = require('fs')
module.exports = {
	write(guild, newData) {
		if ((newData) && (fs.existsSync(`./guilds/${guild.id}.json`))) {
            // eslint-disable-next-line no-unused-vars
            const guildFile = JSON.parse(fs.readFileSync(`./guilds/${guild.id}.json`))
            try {
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
                fs.writeFileSync(`./guilds/${guild.id}.json`, JSON.stringify(defaultData), 'utf-8')
            } catch (err) {
                console.log(err)
            }
        }
	},
}