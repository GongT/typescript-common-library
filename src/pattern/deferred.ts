export interface IResolver<T> {
	(value: T): any
}

export class Deferred<T, E = Error> extends Promise<T> implements Promise<T> {
	private readonly _resolve: IResolver<T>;
	private readonly _reject: IResolver<E>;

	constructor() {
		let _res: any, _rej: any;
		super((resolve, reject) => {
			_res = resolve;
			_rej = reject;
		});
		this.finally(() => {
			Object.assign(this, {
				_resolve: null,
				_reject : null,
			});
		});
		this._resolve = _res;
		this._reject = _rej;
	}

	resolve(v: T) {
		this._resolve(v);
	}

	reject(e: E) {
		this._reject(e);
	}

	public promise(): Promise<T> {
		return this;
	}
}

Object.assign(Deferred, {
	[Symbol.toStringTag]: 'Deferred',
});
