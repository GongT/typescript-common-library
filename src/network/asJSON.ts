import { IResponseMessage } from 'network/fetch';
import { HTTPError } from 'network/error';

export function asJSON<T extends IResponseMessage>(res: Response): Promise<T> {
	if (res.status === 200) {
		return res.json();
	} else {
		return res.text().then(t => {
			throw new HTTPError(res.status, res.statusText, t);
		});
	}
}

