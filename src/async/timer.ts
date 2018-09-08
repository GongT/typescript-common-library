import { Deferred } from 'async/deferred';
import { IRejector, IResolver } from 'async/promise';
import { Cancelable, CancelError } from 'async/cancelable';

export class Timeout extends Deferred<void, CancelError> implements Cancelable {
	private to: number;

	constructor(protected readonly timeoutMS: number) {
		super();
	}

	protected run(resolve: IResolver<void>, reject: IRejector<CancelError>): void {
		this.to = setTimeout(() => {
			resolve(void 0);
		}, this.timeoutMS);
	}

	cancel(asSuccess: boolean = false) {
		clearTimeout(this.to);
		if (asSuccess) {
			this.resolve(void 0);
		} else {
			this.reject(new CancelError);
		}
	}
}
