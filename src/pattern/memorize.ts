import { nameFuncAs, nameOfConstructor } from 'function/nameOf';
import { isNoopFunc } from 'function/isNoopFunc';

declare const console: any;

/***
 *
 */
export function memorize<O, K extends keyof O, V = O[K]>(target: O, propertyKey: K, descriptor: TypedPropertyDescriptor<V>) {
	if (descriptor.get) {
		memorizeProperty(target, propertyKey, descriptor);
		return;
	}
	if (descriptor.value && typeof descriptor.value === 'function') {
		memorizeMethod(target, propertyKey, descriptor as any);
		return;
	}
	throw new Error(`"${propertyKey}" of "${nameOfConstructor(target)}" is not a property or method.`);
}

function memorizeProperty<O, K extends keyof O, V = O[K]>(target: O, propertyKey: K, descriptor: TypedPropertyDescriptor<V>) {
	if (descriptor.set) {
		if (!isNoopFunc(descriptor.set)) {
			throw new Error(`"${propertyKey}" of "${nameOfConstructor(target)}" has non-empty setter, that will cause confuse.`);
		}
	}

	descriptor.set = nameFuncAs(`set(${propertyKey})`, function setter(this: O, v: V) {
		console.log('set');
		delete this[propertyKey];
		Object.defineProperty(this, propertyKey, {
			value: v,
			writable: true,
			enumerable: true,
			configurable: true,
		});
	});
	const original = descriptor.get;
	descriptor.get = nameFuncAs(`get(${propertyKey})`, function getter(this: O): V {
		console.log('get');
		delete this[propertyKey];
		const value = original.call(this);
		Object.defineProperty(this, propertyKey, {
			value,
			writable: true,
			enumerable: true,
			configurable: true,
		});
		return value;
	});
}

function memorizeMethod<O, K extends keyof O, V = O[K]>(target: O, methodName: K, descriptor: TypedPropertyDescriptor<(this: O, ...args: any[]) => V>) {
	const original = descriptor.value;
	descriptor.value = function (this: O, ...args: any[]) {

		this[methodName] = original as any;
		const value = original.apply(this, args);
		delete this[methodName];

		Object.defineProperty(this, methodName, {
			value: () => value,
			writable: true,
			enumerable: true,
			configurable: true,
		});

		return value;
	};
}