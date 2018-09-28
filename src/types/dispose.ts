export interface IDisposable {
	dispose(): void;
}

export function dispose(dis: IDisposable[]): void;
export function dispose(...dis: IDisposable[]): void;
export function dispose(...disArr: (IDisposable[] | IDisposable)[]) {
	for (const dis of disArr) {
		if (Array.isArray(dis)) {
			dispose(dis);
			dis.length = 0;
		} else {
			dis.dispose();
		}
	}
}

export function toDisposable(fn: () => void): IDisposable {
	return { dispose: fn };
}

export class Disposable implements IDisposable {
	private disposables: IDisposable[] = [];

	protected _register(dis: IDisposable) {
		this.disposables.push(dis);
	}

	dispose() {
		dispose(this.disposables);
	}

	protected get toDispose(): IDisposable[] {
		return this.disposables;
	}
}

export class DisposedError extends Error {
	constructor(what?: string) {
		if (what) {
			super(`Cannot use ${what} of disposed.`);
		} else {
			super(`Cannot use disposed object.`);
		}
	}
}

export const NothingDispose = {
	dispose() {},
};
