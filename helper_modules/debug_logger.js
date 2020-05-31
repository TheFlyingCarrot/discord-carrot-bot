module.exports = {
	enabled: false,
	execute(dataTable) {
		const { message, command, args, developers } = dataTable
		console.log(`*new message with prefix recognized
---- message
-------- author
------------ message.author.tag:   ${message.author.tag}
------------ message.author.id:    ${message.author.id}
-------- message.content:          ${message.content}
-------- message.channel:          ${message.channel}
-------- message.channel.type:     ${message.channel.type}
-------- message.createdAt:        ${message.createdAt}
-------- guild
------------ message.guild:        ${message.guild ? message.guild : 'null'}
------------ message.guild.id:     ${message.guild.id ? message.guild.id : 'null'}
-------- command recognized
------------ command.name:         ${command ? command.name : 'null'}
------------ args:                 ${args ? args : 'null'}
-------- developer
------------ developers:           ${developers}
------------ isDeveloper:          ${developers.includes(message.author.id) ? 'true' : 'false'}`)
	},
}