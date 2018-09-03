import {createLogger} from "../debug/create-logger";
import {LOG_LEVEL} from "../debug/levels";
import {ApiResponse, getErrorMessage, STATUS_CODE_BASE} from "./protocol";
import {HTTP} from "./request";

const warn = createLogger(LOG_LEVEL.WARN, 'ErrorResponse');

export interface ErrorResponse extends ApiResponse {
	status: number;
	statusName: string;
	message: string;
	errorDescription?: string;
	errorStack?: string;
}

export class RequestError {
	protected err_code: number;
	protected error: Error;
	private _stack: string;
	private _errorDesc: string;
	private _friendlyMessage: string;
	
	constructor(code: STATUS_CODE_BASE|number, message: string, e = new Error()) {
		this._stack = e.stack.replace(/^.*\n.*\n/, '');
		this._errorDesc = getErrorMessage(code, e);
		this._friendlyMessage = message;
		this.err_code = code;
	}
	
	static standardError(code: STATUS_CODE_BASE|number, extraMessage: Error|string) {
		if (extraMessage instanceof Error) {
			const ret = new RequestError(code, getErrorMessage(STATUS_CODE_BASE.UNKNOWN_ERROR, extraMessage));
			ret._errorDesc = extraMessage.message;
			ret.stack = extraMessage.stack;
			return ret;
		} else {
			return new RequestError(code, extraMessage);
		}
	}
	
	static internal(err: RequestError|Error): RequestError {
		if (err instanceof RequestError) {
			return err;
		}
		const newErr = new RequestError(-HTTP.INTERNAL_SERVER_ERROR, '', err);
		newErr._friendlyMessage = newErr._errorDesc;
		newErr._errorDesc = err.message;
		if (err.stack) {
			newErr.stack = err.stack;
		} else {
			newErr.stack = 'Error: request failed';
		}
		return newErr;
	}
	
	toJSON() {
		return this.response();
	};
	
	response(): ErrorResponse {
		return {
			status: this.code,
			message: this.message,
			statusName: STATUS_CODE_BASE[this.code] || 'UNEXPECTED ERROR',
			errorDescription: this._errorDesc,
			errorStack: this.stack,
		};
	}
	
	public get code(): number {
		return this.err_code;
	}
	
	public get message(): string {
		return this._friendlyMessage;
	}
	
	get stack(): string {
		if (!this._stack) {
			this.stack = this.error.stack;
		}
		return (this.constructor['name'] || "Error") + ': ' + this._errorDesc + '\n' + this._stack;
	}
	
	set stack(v) {
		if (typeof v === 'string') {
			this._stack = v.replace(/^.*\n/, '');
		} else {
			warn('warn: modify error stack, but not a string.');
			this._stack = v;
		}
	}
}
