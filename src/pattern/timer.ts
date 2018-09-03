///<reference types="node"/>

import { EventEmitter } from 'events';

export class Timer<T> extends EventEmitter {
	protected running: Promise<any> = null;
	protected started: boolean = false;
	private ticking = false;
	protected time: number;
	protected timer: number = 0;
	
	constructor(protected cb: () => T) {
		super();
		this.reset = this.reset.bind(this);
		this.tick = this.tick.bind(this);
		this.delayNext = this.delayNext.bind(this);
		this.handleError = this.handleError.bind(this);
	}
	
	immediately() {
		if (this.running) {
			return this.running.then(() => {
				return this.immediately();
			}, () => {
				return this.immediately();
			});
		}
		
		const started = this.started;
		if (started) {
			this.reset();
		}
		
		const p = this.tick();
		
		if (started) {
			p.then(() => {
				if (!this.started) {
					this.started = true;
					this.delayNext();
				}
			});
		}
		
		return p;
	}
	
	interval(ms: number) {
		this.time = ms;
	}
	
	/* resolve or reject first tick, after the 1st, no promise anymore */
	start(ms?: number): Promise<T> {
		if (this.started) {
			throw new Error('Cannot start timer when already started');
		}
		this.started = true;
		if (ms >= 0) {
			this.interval(ms);
		}
		
		return this.delay();
	}
	
	stop() {
		if (this.started) {
			this.reset();
		}
	}
	
	protected delay(): Promise<any> {
		if (!this.time) {
			throw new TypeError('no timer value set.');
		}
		return new Promise((resolve, reject) => {
			// this.emit('start');
			this.timer = <any>setTimeout(() => {
				const p = this.tick();
				p.then(resolve, reject);
				p.catch(this.reset);
				p.catch(this.handleError);
				p.then(this.delayNext);
			}, this.time);
		});
	}
	
	protected delayNext() {
		if (!this.started) {
			return;
		}
		this.timer = <any>setTimeout(() => {
			const p = this.tick();
			p.catch(this.handleError);
			p.then(this.delayNext);
		}, this.time);
	}
	
	private handleError(e: Error) {
		if (this.listenerCount('error') > 0) {
			try {
				this.emit('error', e);
			} catch (e) {
				console.error('\x1B[0;38;5;9m%s\x1B[0m', e.stack);
				process.exit(1);
			}
		} else {
			console.error('\x1B[0;38;5;9m%s\x1B[0m', e.stack);
			process.exit(1);
		}
	}
	
	private reset() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
		this.started = false;
		this.timer = 0;
		// this.emit('end');
	}
	
	protected async tick() {
		if (this.ticking) {
			throw new Error('try to run multiple tick function.');
		}
		if (this.running) {
			console.error('tick function call when running. ignored.');
			return this.running;
		}
		this.ticking = true;
		this.running = Promise.resolve(this.cb());
		this.ticking = false;
		// this.emit('tick');
		const ret = await this.running;
		this.running = null;
		return ret;
	}
	
	get isRunning() {
		return !!this.running;
	}
}

export type Timeout = Promise<void>&{kill(asSuccess?: boolean): void};

export function timeout(ms: number): Timeout {
	let to = null;
	let kill: any;
	const p = <any>new Promise((resolve, reject) => {
		to = setTimeout(() => {
			resolve();
		}, ms);
		kill = (asSuccess: boolean = false) => {
			clearTimeout(to);
			if (asSuccess) {
				resolve();
			} else {
				reject();
			}
		};
	});
	p.kill = kill;
	return p;
}
