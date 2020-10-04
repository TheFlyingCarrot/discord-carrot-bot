const { personal_role_id } = require('../config.json')

export async function cleanseOldVIPRoles (guild: any, guildMember: any, reason: string) {
    const personal_role = await guild.roles.fetch(personal_role_id)
    guildMember.roles.cache.forEach((existingRole: { id: any, position: number, delete: (arg0: any, arg1: string) => void }) => {
        if (existingRole.id !== guild.roles.everyone.id && existingRole.position < personal_role.position) {
            existingRole.delete(existingRole, reason)
        }
    })
}
