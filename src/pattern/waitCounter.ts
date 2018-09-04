import { Deferred } from 'pattern/deferred';

export class WaitCounter {
	private count = 0;
	private done: boolean;
	private locked: boolean;
	private promise: Deferred<void>;
	private started: boolean = false;

	constructor(private title: string) {
		this.done = false;
		this.promise = new Deferred<void>();
		this.promise.finally(() => {
			this.done = true;
		});
	}

	protected lock() {
		if (this.checkDone()) {
			return;
		}
		this.locked = true;
		if (this.count === 0) {
			return this.promise.resolve(null);
		}
	}

	pop() {
		if (this.checkLock() || this.checkDone()) {
			return;
		}
		this.count--;
		if (this.count === 0) {
			return this.promise.resolve(void 0);
		}
	}

	push() {
		if (this.checkDone()) {
			return;
		}
		if (!this.started) {
			this.start();
		}
		this.count++;
	}

	wait(): Promise<void> {
		return this.promise;
	}

	protected checkDone() {
		if (this.done) {
			this.promise.reject(new Error(`WaitContainer[${this.title}] is already done.`));
			return true;
		}
		return false;
	}

	protected checkLock() {
		if (!this.locked) {
			this.promise.reject(new TypeError(`WaitContainer[${this.title}] must not pop before lock.`));
			return true;
		}
		return false;
	}

	private start() {
		this.started = true;
		setTimeout(() => {
			this.lock();
		}, 0);
	}
}
