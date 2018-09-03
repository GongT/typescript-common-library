const nameSymbol = 'displayName';
const inspectSymbol = 'inspect';

export function nameOfConstructor(obj: any): string {
	return nameOfFunc(obj.constructor);
}

export function nameOfFunc(fun: Function): string {
	return nameSymbol in fun ? fun[nameSymbol] : fun.name;
}

export function nameFuncAs<T extends Function>(name: string, func: T): T {
	func[nameSymbol] = name;
	func[inspectSymbol] = () => {
		return `[Function ${func[nameSymbol] || func.name}]`;
	};
	return func;
}