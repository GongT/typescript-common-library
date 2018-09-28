import { Bomb, EmitEvent, Emitter } from 'async/event';
import { Disposable, IDisposable } from 'types/dispose';

export interface Cancelable {
	cancel(): void;
}

export class AbortError extends Error {
	constructor() {
		super('User Aborted');
	}
}

export class CancellationController implements IDisposable {
	private _token: CancellationToken;
	private _emit: Bomb;

	cancel() {
		if (this._token) {
			this._emit.fire();
		} else {
			this._token = CanceledToken;
		}
	}

	get token() {
		if (!this._token) {
			this._emit = new Bomb;
			this._token = new CancellationToken(this._emit);
		}
		return this._token;
	}

	dispose() {
		this._token.dispose();
		this._token = CanceledToken;
		delete this._emit;
	}
}

export class CancellationToken extends Disposable {
	private _isCanceled = false;
	private abortController: AbortController;
	protected _onCancel: EmitEvent;

	constructor(trigger: Emitter) {
		super();
		this._onCancel = trigger.event;
		this._onCancel(() => {
			this._isCanceled = true;
			delete this._onCancel;
			if (this.abortController) {
				this.abortController.abort();
				delete this.abortController;
			}
		});
	}

	onCancel(cb: () => void) {
		if (this._isCanceled) {
			return cb();
		}
		this._register(this._onCancel(cb));
	}

	get isCanceled() {
		return this._isCanceled;
	}
}

const event = new Bomb;
event.fire();
const CanceledToken = new CancellationToken(event);

