export class QueueWait {
	private callback: (err: any, data?: any) => any;
	private count = 0;
	private done: boolean;
	private locked: boolean;
	private promise: Promise<void>;
	private started: boolean = false;
	
	constructor(private title: string) {
		this.done = false;
		this.promise = new Promise<void>((resolve, reject) => {
			this.callback = (err, data) => {
				if (this.done) {
					return this.callback(new TypeError(`QueueWait: [${this.title}] has already done.`));
				}
				this.done = true;
				return err? reject(err) : resolve(data);
			};
		});
	}
	
	lock() {
		this.locked = true;
		if (this.count === 0) {
			return this.callback(null, true);
		}
	}
	
	pop() {
		if (!this.locked) {
			return this.callback(new TypeError(`QueueWait: [${this.title}] must not pop before lock.`));
		}
		this.count--;
		if (this.count === 0) {
			return this.callback(null, true);
		}
	}
	
	push() {
		if (this.locked) {
			throw new TypeError(`QueueWait: can not [${this.title}] after app started.`);
		}
		if (!this.started) {
			this.start();
		}
		this.count++;
	}
	
	wait() {
		return this.promise;
	}
	
	private start() {
		this.started = true;
		setTimeout(() => {
			this.lock();
		}, 0);
	}
}
