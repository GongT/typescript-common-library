import { Deferred } from 'async/deferred';

export type Timeout = Promise<void> & {kill(asSuccess?: boolean): void};

export function timeout(ms: number): Timeout {
	const to: number = setTimeout(() => {
		ret.resolve(void 0);
	}, ms);

	const ret = Object.assign(new Deferred<void>(), {
		kill(asSuccess: boolean = false) {
			clearTimeout(to);
			if (asSuccess) {
				ret.resolve(void 0);
			} else {
				ret.reject(void 0);
			}
		},
	});

	return ret;
}
