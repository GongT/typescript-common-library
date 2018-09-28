export type MyCallback<VALIST extends any[]> = (...p: VALIST) => void | boolean;

export class CallbackList<VALIST extends any[]> {
	protected list = new Set<MyCallback<VALIST>>();
	private maxListener: number = 10;

	public add(item: MyCallback<VALIST>): void {
		if (typeof item !== 'function') {
			throw new TypeError('callback is not a function');
		}
		if (this.list.has(item)) {
			throw new Error('duplicate callback');
		}
		this.list.add(item);
		if (this.list.size === this.maxListener) {
			console.trace('%s listener registered (the limit is %s), check memory leak.', this.list.size, this.maxListener);
		} else if (this.list.size >= this.maxListener * 2) {
			throw new Error(`too many (${this.list.size}) listener.`);
		}
	}

	public remove(item: MyCallback<VALIST>) {
		this.list.delete(item);
	}

	public clear() {
		this.list.clear();
	}

	limit(limit: number): any {
		this.maxListener = limit;
	}

	public get runner() {
		return (...argument: VALIST) => {
			if (this.list.size === 0) {
				return true;
			}
			for (const [cb] of this.list.entries()) {
				let ret = cb(...argument);
				if (ret === false) {
					return ret;
				}
			}
			return true;
		};
	}
}
