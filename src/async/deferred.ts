import { Working } from 'async/working';
import { IRejectHandler, IRejector, IResolveHandler, IResolver, Thenable } from 'async/promise';

export class Deferred<T, E extends Error = Error> extends Working<T> implements Thenable<T, E> {
	private readonly _resolve: IResolver<T>;
	private readonly _reject: IRejector<E>;

	protected run(resolve: IResolver<T>, reject: IRejector<E>) {
		Object.assign(this, {
			_resolve: resolve,
			_reject : reject,
		});
	}

	constructor() {
		super();
	}

	resolve(v: T) {
		this._resolve(v);
		Object.assign(this, {
			_resolve: null,
			_reject : null,
		});
	}

	reject(e: E) {
		this._reject(e);
		Object.assign(this, {
			_resolve: null,
			_reject : null,
		});
	}

	then<RT, RE extends Error>(
		onFulfilled: IResolveHandler<RT, T>,
		onRejected: IRejectHandler<RE, E>,
	): Thenable<RT, RE> {
		return this._promise;
	}
}
