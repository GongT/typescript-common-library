import { hiddenProperty } from 'objects/hiddenProperty';

declare const process: any;
declare const require: any;

let symbol: symbol;
if (process && process.versions && process.versions.node) {
	symbol = require('util').inspect.custom;
} else {
	symbol = Symbol.for('nodejs.util.inspect.custom');
}

export function assignInspectContent<T>(object: T, cb: (this: T) => string) {
	hiddenProperty(object, symbol, cb);
	hiddenProperty(object, 'inspect', cb);
}

export function InspectContent<T>(cb: (this: T) => string): ClassDecorator {
	return function (cls: new() => T) {
		assignInspectContent(cls.prototype, cb);
	} as any;
}