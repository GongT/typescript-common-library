const nameSymbol = 'displayName';
const inspectSymbol = 'inspect';

export function nameOfConstructor(obj: any): string {
	return nameOfFunc(obj.constructor);
}

export function nameOfFunc(fun: Function): string {
	return fun.hasOwnProperty(nameSymbol)? (fun as any)[nameSymbol] : fun.name;
}

export function nameFuncAs<T extends Function>(name: string, fun: T): T {
	if (fun.hasOwnProperty(nameSymbol)) {
		throw new TypeError(`function ${nameOfFunc(fun)} already has name.`);
	}
	renameFuncAs(name, fun);
	return fun;
}

export function renameFuncAs<T extends Function>(name: string, fun: T): T {
	const f = fun as any;
	f[nameSymbol] = name;
	f[inspectSymbol] = () => {
		return `[Function ${name}]`;
	};
	return fun;
}