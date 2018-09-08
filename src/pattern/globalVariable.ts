import { hiddenProperty } from 'objects/hiddenProperty';
import { symbolCode } from 'strings/symbolCode';
import { InspectContent } from 'objects/inspect';
import { StringTag } from 'objects/stringTag';

declare const window: any;

const symbol = Symbol.for('@gongt/__PAGE_DATA__');

@StringTag('GlobalVariable')
@InspectContent<GlobalVariable>(function () {
	return 'GlobalVariable'
	       + '[<' + (typeof this.parent) + ' ' + (this.parent.constructor.name) + '>] '
	       + JSON.stringify(this.data, null, 2);
})
export class GlobalVariable<IShape = any> {
	private data: Map<keyof IShape, any>;
	private parent: any;

	static symbol = symbol;
	private symbol: symbol = symbol;

	static getObject(parent: any) {
		if (!parent[symbol]) {
			hiddenProperty(parent, symbol, new Map);
		}
		return parent[symbol];
	}

	constructor(parent?: any) {
		if (!parent && typeof window === 'object') {
			parent = window;
		} else if (!parent) {
			throw TypeError('GlobalVariable must have a argument, eg. express.Request object.');
		}
		this.data = GlobalVariable.getObject(parent);

		hiddenProperty(this, 'parent', parent);
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
		return `((symbol, hiddenProperty, data) => {
	if(!window[symbol]) {
		hiddenProperty(window, symbol, new Map);
	}
	const o = window[symbol];
	for (const [k, v] of Object.entries(data)) {
		o.set(k, v);
	}
})(${symbolCode(this.symbol, true)}, ${hiddenProperty.toString()}, ${this.toJSON()});`;
	}
}

