import { bodyOfFunc } from 'function/bodyOfFunc';

export function isNoopFunc(func: Function) {
	return bodyOfFunc(func).trim().length === 0;
}