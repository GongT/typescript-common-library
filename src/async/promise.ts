export interface IResolver<T> {
	(value?: T | PromiseLike<T>): void;
}

export interface IRejector<E extends Error = Error> {
	(reason?: E): void;
}

export type IResolveHandler<T, VT> = IResolveHandlerT<T, VT> | undefined | null;

export interface IResolveHandlerT<T, VT> {
	<X = VT>(value: X): PromiseLike<T> | T;
}

export type IRejectHandler<T, VE extends Error> = IRejectHandlerT<T, VE> | undefined | null;

export interface IRejectHandlerT<T, VE extends Error> {
	<E = VE>(reason: E): PromiseLike<T | never> | T | never;
}

export interface Thenable<T, E extends Error = Error> {
	then<RT, RE extends Error>(
		onFulfilled: IResolveHandler<RT, T>,
		onRejected: IRejectHandler<RE, E>,
	): Thenable<RT, RE>;
}

export interface IAsyncWorker<T> {
	promise(): PromiseLike<T>;
}
