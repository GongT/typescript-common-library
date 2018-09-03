import { isWindows } from 'environment/platform';

let posixPath = (e: string) => e;
if (isWindows) {
	posixPath = (e: string) => e.replace(/\\/g, '/');
}

export { posixPath };