const singleton = Symbol('@@singleton');

export function Singleton(preventDuplicateNew = false) {
	return function Singleton<T extends {new(...args: any[]): any, name: string}>(cls: T): T & SingletonOf<T> {
		return <any>new Proxy<T>(cls, {
			construct(target: T, argArray: any, newTarget?: any) {
				if (cls.hasOwnProperty(singleton)) {
					if (preventDuplicateNew) {
						throw new TypeError('Cannot create multiple instance of singleton class `' + cls.name + '`.');
					}
					return (cls as any)[singleton];
				}
				const newInstance = new target(...argArray);
				Object.defineProperty(cls, singleton, {
					value       : newInstance,
					writable    : false,
					configurable: false,
					enumerable  : false,
				});
				return newInstance;
			},
		});
	};
}

export interface SingletonOf<T> {
	readonly [singleton]: T;
}
