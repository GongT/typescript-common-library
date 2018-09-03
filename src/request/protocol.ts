export interface Protocol {
}

export interface ApiResponse extends Protocol {
	errorDescription?: string;
	errorStack?: string;
	message?: string;
	status?: number;
	statusName?: string;
}

export interface ApiRequest extends Protocol {
	
}

export type STATUS_CODE_TYPE = number;

export enum STATUS_CODE_BASE {
	SUCCESS = 0,
	UNKNOWN_ERROR,
	NO_RESPONSE,
	NOT_IMPLEMENT,
	INVALID_INPUT,
	DATA_NOT_EXISTS,
	LOGIN_REQUIRED,
	HTTP_ERROR,
}

export interface ErrorMap {
	[id: string]: number;
}

let guid: number = STATUS_CODE_BASE.SUCCESS;

export function registerStatusCodeSubClass(map: object) {
	if (map[0] || map['SUCCESS']) {
		throw new Error('define of STATUS_CODE has `0` or `SUCCESS` key, this is not allowed');
	}
	Object.assign(STATUS_CODE_BASE, map);
	Object.assign(map, STATUS_CODE_BASE);
}

export type ErrorDescriber = (code: string, err?: Error) => string;
export type ExceptionDescriber = (code: string, stack: string, err?: Error) => string|void;
let errorDesc: ErrorDescriber = defaultDescriber;
let exceptionDesc: ExceptionDescriber;

export function getErrorMessage(code: STATUS_CODE_BASE, error?: Error) {
	if (code in STATUS_CODE_BASE) {
		return errorDesc(STATUS_CODE_BASE[code], error);
	} else if (exceptionDesc) {
		return exceptionDesc(code.toString(), error? error.stack : '', error) || `***NO DESCRIPTION ABOUT ERROR ${code}***`;
	} else {
		return `***NO DESCRIPTION ABOUT ERROR ${code}, NO HANDLER***`;
	}
}

export function registerErrorDescriber(fn: ErrorDescriber) {
	errorDesc = fn;
}

export function registerExceptionDescriber(fn: ExceptionDescriber) {
	exceptionDesc = fn;
}

function defaultDescriber(code: string) {
	return `***NO DESCRIPTION ABOUT ERROR ${code}***`;
}
