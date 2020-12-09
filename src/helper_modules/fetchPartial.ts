export async function fetchPartial (partial) {
	try {
		await partial.fetch()
	} catch (error) {
		console.error(error)
		return null
	}
	return partial
}
