import { CancellationToken } from 'async/cancelable';

export interface IMessage {

}

export interface IRequestMessage extends IMessage {
}

export interface IResponseMessage extends IMessage {
	status: number;
	message?: string;
	error?: string;
	errorStack?: string;
}

export function jsonApi<Req extends IRequestMessage, Res extends IResponseMessage>(url: string) {
	return (req: Req, cancel?: CancellationToken) => {
		return fetch(url, {
			method        : 'POST',
			body          : req as any,
			mode          : 'cors',
			credentials   : 'omit',
			cache         : 'reload',
			redirect      : 'error',
			referrer      : 'client',
			referrerPolicy: 'strict-origin' as any,
			// signal        : cancel.signal,
		} as RequestInit);
	};
}
