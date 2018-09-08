export function hiddenProperty(object: any, key: string | symbol, value: any) {
	Object.defineProperty(object, key, {
		configurable: false,
		enumerable  : false,
		writable    : false,
		value,
	});
}