import { isWindows } from 'environment/platform';

let posixPath = (e: string) => e;
if (isWindows) {
	const isWindowsAbsolute = /^[a-zA-Z]:/;
	posixPath = (e: string) => {
		e = e.replace(/\\/g, '/');
		if (isWindowsAbsolute.test(e[0])) {
			return '//' + e;
		} else {
			return e;
		}
	};
}

export { posixPath };
