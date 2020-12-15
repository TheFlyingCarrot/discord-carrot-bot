export async function fetchPartial (partial: Partial<any>) {
	try {
		await partial.fetch()
	} catch (error) {
		console.error(error)
		return null
	}
	return partial
}
