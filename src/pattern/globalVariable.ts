declare const window: any;

export class GlobalVariable<IShape = any> {
	private data: Map<keyof IShape, any>;
	private parent: any;

	static getObject(parent: any) {
		if (!parent['__PAGE_DATA__']) {
			Object.defineProperty(parent, '__PAGE_DATA__', {
				value: new Map,
				configurable: false,
				enumerable: false,
				writable: false,
			});
		}
		return parent['__PAGE_DATA__'];
	}

	constructor(parent?: any) {
		if (!parent && typeof window === 'object') {
			parent = window;
		} else if (!parent) {
			throw TypeError('GlobalVariable must have a argument, eg. express.Request object.');
		}
		this.data = GlobalVariable.getObject(parent);

		Object.defineProperty(this, 'parent', {
			value: parent,
			configurable: false,
			enumerable: false,
			writable: false,
		});
	}

	set<T extends keyof IShape>(k: T, v: IShape[T]) {
		this.data.set(k, v);
	}

	get<T extends keyof IShape>(k: T): IShape[T] {
		return this.data.get(k);
	}

	get holder() {
		return this.parent;
	}

	toJSON() {
		const data: IShape = {} as any;
		for (const [k, v] of this.data.entries()) {
			data[k] = v;
		}

		return data;
	}

	toString() {
		return `((data) => {
	if(!window.__PAGE_DATA__) {
		Object.defineProperty(window, '__PAGE_DATA__', {
			value: new Map,
			configurable: false,
			enumerable: false,
			writable: false,
		});
	}
	for (const [k, v] of Object.entries(data)) {
		window.__PAGE_DATA__.set(k, v);
	}
})(${this.toJSON()});`;
	}

	inspect(depth, opt) {
		return 'GlobalVariable'
		       + '[<' + (typeof this.parent) + ' ' + (this.parent.constructor.name) + '>] '
		       + JSON.stringify(this.data, null, 2);
	}

	[Symbol.toStringTag]() {
		return 'GlobalVariable';
	}
}

