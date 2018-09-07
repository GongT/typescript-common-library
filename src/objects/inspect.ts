declare const process: any;
declare const require: any;

let symbol: Symbol;
if (process && process.versions && process.versions.node) {
	symbol = require('util').inspect.custom;
} else {
	symbol = Symbol.for('nodejs.util.inspect.custom');
}

export function assignInspectContent<T>(object: T, cb: (self: T) => string) {
	Object.assign(object, {
		[symbol] : cb,
		'inspect': cb,
	});
}

export function InspectContent<T extends Function>(cb: (self: T) => string): ClassDecorator {
	return function (cls: T) {
		assignInspectContent(cls.prototype, cb);
	};
}