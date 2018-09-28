import { bodyOfFunc } from 'function/bodyOfFunc';
import { removeComments } from 'function/removeComments';

const isNoop = Symbol('noop');

export function isNoopFunc(func: Function) {
	if ((func as any)[isNoop]) {
		return true;
	}
	return (func as any)[isNoop] = removeComments(bodyOfFunc(func)).trim().length === 0;
}

export function noop() {
}

isNoopFunc(noop);
