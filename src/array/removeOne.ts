export function removeOne<T>(array: T[], remove: T): T {
	const id = array.indexOf(remove);
	if (id === -1) {
		return undefined;
	}
	return array.splice(id, 1)[0];
}