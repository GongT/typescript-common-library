export type MyCallback<VALIST extends any[]> = (...p: VALIST) => void | boolean;

export class CallbackList<VALIST extends any[]> {
	protected list: MyCallback<VALIST>[] = [];

	constructor() {
	}

	add(item: MyCallback<VALIST>) {
		return this.list.push(item);
	}

	remove(item: MyCallback<VALIST>) {
		const found = this.list.indexOf(item);
		if (found !== -1) {
			return this.list.splice(found, 1);
		}
		return [];
	}

	run(...argument: VALIST) {
		return this.list.some((cb, i) => {
			let ret = cb(...argument);
			return ret === false;
		});
	}
}
