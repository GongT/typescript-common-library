import { NodeStyleCallback, TypedFunction } from 'types/function';

export function nfcall<R, T extends any[]>(fn: TypedFunction<T & NodeStyleCallback<R>[], void>, ...args: T): Promise<R> {
	const dfd = new Promise<R>((resolve, reject) => {
		const wrappedCallback: NodeStyleCallback<R> = (err, data) => err? reject(err) : resolve(data);
		args.push(wrappedCallback);
	});

	fn(...args);

	return dfd;
}

export function ninvoke<thisArg, R, T extends any[]>(this: thisArg, fn: TypedFunction<T & NodeStyleCallback<R>[], void, thisArg>, ...args: T): Promise<R> {
	const dfd = new Promise<R>((resolve, reject) => {
		const wrappedCallback: NodeStyleCallback<R> = (err, data) => err? reject(err) : resolve(data);
		args.push(wrappedCallback);
	});

	fn.apply(this, args);

	return dfd;
}
