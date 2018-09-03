import { createHash } from 'crypto';

export function md5(data: string|Buffer) {
	return createHash('md5').update(data).digest().toString('hex');
}
