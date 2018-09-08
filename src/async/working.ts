import { IAsyncWorker, IRejector, IResolver } from 'async/promise';

export abstract class Working<T> implements IAsyncWorker<T> {
	protected readonly _promise: Promise<T>;

	protected abstract run(resolve: IResolver<T>, reject: IRejector<Error>): void;

	constructor() {
		this._promise = new Promise((resolve, reject) => {
			this.run(resolve, reject);
		});
	}

	public promise(): Promise<T> {
		return this._promise;
	}
}