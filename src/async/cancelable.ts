export interface Cancelable {
	cancel(): void;
}

export class CancelError extends Error {
	constructor() {
		super('Canceled');
	}
}
