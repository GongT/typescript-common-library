declare const navigator: any;
declare const process: any;

export const isNode = typeof process === 'object' && typeof process.nextTick === 'function' && typeof process.platform === 'string';
export const isBrowser = typeof navigator === 'object';

let _isWindows: boolean;
let _isMac: boolean;
let _isLinux: boolean;

if (isNode) {
	_isWindows = (process.platform === 'win32');
	_isMac = (process.platform === 'darwin');
	_isLinux = (process.platform === 'linux');
} else if (isBrowser) {
	const userAgent = navigator.userAgent;
	_isWindows = userAgent.indexOf('Windows') >= 0;
	_isMac = userAgent.indexOf('Macintosh') >= 0;
	_isLinux = userAgent.indexOf('Linux') >= 0;
}
export const isWindows = _isWindows;
export const isMac = _isMac;
export const isLinux = _isLinux;