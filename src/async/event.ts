import { DisposedError, IDisposable, NothingDispose } from 'types/dispose';
import { CallbackList } from 'function/callback-list';

interface EventHandler<T extends any[] = void[]> {
	(...data: T): void;
}

export interface EmitEvent<T extends any[] = void[]> {
	(handler: EventHandler<T>): IDisposable;
}

export class Emitter<T extends any[] = void[]> implements IDisposable {
	protected readonly handlers = new CallbackList<T>();
	public readonly fire = this.handlers.runner;
	protected _dispose: boolean = false;
	protected _lock: boolean = false;

	constructor() {}

	/**
	 * prevent any more listen
	 */
	lock(lock = true) {
		this._lock = lock;
	}

	setLimit(limit: number) {
		this.handlers.limit(limit);
	}

	public dispose(weak = false): void {
		if (this._dispose) {
			return;
		}
		this._dispose = true;
		this.handlers.clear();
		Object.assign(this, {
			handlers: null,
			fire    : () => {
				throw new DisposedError('fire');
			},
		});
	}

	public get event(): EmitEvent<T> {
		return (handler: EventHandler<T>) => {
			if (this._lock) {
				throw new Error('EventEmitter has been locked.');
			}
			if (this._dispose) {
				throw new DisposedError('event');
			}
			this.handlers.add(handler);
			return {
				dispose: () => {
					this.handlers.remove(handler);
				},
			};
		};
	}
}

export class Bomb<T extends any[] = void[]> extends Emitter<T> {
	private _fire = false;
	private memorized: T;

	public get fire() {
		return (...a: T) => {
			if (this._fire) {
				throw new Error(`Bomb already fired.`);
			}
			this._fire = true;
			this.memorized = a;

			const ret = this.handlers.runner(...a);

			this.handlers.clear();

			return ret;
		};
	}

	public get event(): EmitEvent<T> {
		if (this._fire) {
			return (handler: EventHandler<T>) => {
				setImmediate(() => {
					handler(...this.memorized);
				});
				return NothingDispose;
			};
		} else {
			return super.event;
		}
	}
}
