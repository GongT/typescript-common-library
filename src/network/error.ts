export class HTTPError extends Error {
	name: string;
	message: string;
	stack: string;

	constructor(status: number, statusText: string, body: string) {
		super();

		this.name = 'HttpError';
		this.message = `HTTP ${status}: ${statusText}`;
		this.stack = body;
	}
}
