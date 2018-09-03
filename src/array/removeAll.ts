import { removeItems } from 'array/removeItems';

export function removeAll<T>(array: T[], toRemove: T): T[] {
	return removeItems(array, (e) => e === toRemove);
}