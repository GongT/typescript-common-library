export function Singleton(preventDuplicateNew = false) {
	return function Singleton<T extends {new(...args: any[]): any, name: string}>(cls: T): T&SingletonOf<T> {
		const singleton = Symbol('@@singleton/' + cls.name);
		Object.defineProperty(cls, 'singleton', {
			get() {
				return this[singleton];
			},
			configurable: true,
			enumerable: false,
		});
		return <any>new Proxy<T>(cls, {
			construct(target: T, argArray: any, newTarget?: any) {
				if (cls.hasOwnProperty(singleton)) {
					if (preventDuplicateNew) {
						throw new TypeError('Cannot create multiple instance of singleton class `' + cls.name + '`.');
					}
					return cls[singleton];
				}
				return cls[singleton] = new target(...argArray);
			},
		});
	}
}

/*
 
 
 public get singleton(): ReduxStoreWindow<any> {
 return ReduxStoreWindow._singleton;
 }
 */

export interface SingletonOf<T> {
	readonly singleton: T;
}

if (typeof Proxy === 'undefined') { // IE
	module.exports.Singleton = (preventDuplicateNew = false) => {
		return <T>(cls: T): T => {
			Object.defineProperty(cls, 'singleton', {
				get() {
					return this['_singleton'];
				},
				configurable: true,
				enumerable: false,
			});
			
			const ret: any = function (...argArray: any[]) {
				if (cls.hasOwnProperty('_singleton')) {
					if (preventDuplicateNew) {
						throw new TypeError('Cannot create multiple instance of singleton class `' + cls['name'] + '`.');
					}
					return cls['_singleton'];
				}
				return cls['_singleton'] = new (<any>cls)(...argArray);
			};
			Object.defineProperty(ret, 'singleton', {
				get() {
					return cls['_singleton'];
				},
				configurable: true,
				enumerable: false,
			});
			return ret;
		};
	};
}
