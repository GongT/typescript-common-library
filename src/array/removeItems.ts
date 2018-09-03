export function removeItems<T>(array: T[], ifRemove: (e: T, index: number, self: T[]) => boolean) {
	const removed: T[] = [];
	for (let index = array.length - 1; index >= 0; index--) {
		if (ifRemove(array[index], index, array)) {
			removed.push(array.splice(index, 1)[0]);
		}
	}
	return removed;
}
