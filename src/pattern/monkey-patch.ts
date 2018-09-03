export interface ArgEditor {
	(this: any, args: any[]): any[];
}

export interface RetEditor {
	(this: any, ret: any, args?: any[]): any[];
}

export interface WrapFunction {
	(this: any, ...args: any[]): any;
}

export type ErrorHandler = (err: Error, args?: any[]) => void;

export class MonkeyPatch<FnType extends Function> {
	private original: FnType&{__hasWrapped?: MonkeyPatch<FnType>};
	private prependList: WrapFunction[];
	private appendList: WrapFunction[];
	private returnModify: RetEditor;
	private argumentsModify: ArgEditor;
	private errorHandler: ErrorHandler;
	private detectedName: string;
	
	constructor(original: FnType&{__hasWrapped?: MonkeyPatch<FnType>}, returnModify?: RetEditor) {
		if (original && original.hasOwnProperty('__hasWrapped')) {
			return <any>original.__hasWrapped;
		}
		this.original = original;
		original.__hasWrapped = this;
		this.returnModify = returnModify;
		this.detectedName = original['_name'] || original.name || 'anonymous_' + detectStack();
	}
	
	catchError(fn: ErrorHandler) {
		if (!this.original) {
			throw new Error('patch error handler, but there is no function to call.');
		}
		this.errorHandler = fn;
	}
	
	release() {
		this.original = null;
		delete this.original.__hasWrapped;
	}
	
	prepend(fn: WrapFunction) {
		if (!this.prependList) {
			this.prependList = [];
		}
		this.prependList.unshift(fn);
	}
	
	append(fn: WrapFunction) {
		if (!this.appendList) {
			this.appendList = [];
		}
		this.appendList.push(fn);
	}
	
	argumentsValue(fn: ArgEditor) {
		this.argumentsModify = fn;
	}
	
	returnValue(fn) {
		this.returnModify = fn;
	}
	
	getFunction(): FnType {
		const def = this;
		
		function wrappedFunction(this: any, ...args: any[]) {
			if (def.argumentsModify) {
				args = def.argumentsModify.call(this, args);
			}
			
			if (def.prependList) {
				def.prependList.forEach((cb) => {
					cb.apply(this, args);
				});
			}
			let ret;
			if (def.original) {
				if (def.errorHandler) {
					try {
						ret = def.original.apply(this, args);
					} catch (e) {
						def.errorHandler(e, args);
						throw e;
					}
				} else {
					ret = def.original.apply(this, args);
				}
			}
			args.push(ret);
			
			if (def.appendList) {
				def.appendList.forEach((cb) => {
					cb.apply(this, args);
				});
			}
			if (def.returnModify) {
				return def.returnModify.call(this, args.pop(), args);
			}
			return ret;
		}
		
		wrappedFunction['__hasWrapped'] = this;
		wrappedFunction['displayName'] = `MonkeyPatch(${this.detectedName})`;
		wrappedFunction['_name'] = this.detectedName;
		return <any>wrappedFunction;
	}
}

function detectStack() {
	const err = new Error;
	const file = err.stack.split(/\n/g)[3] || '';
	const m = /\/[^\/]+:\d+:\d+/.exec(file);
	return m? m[0].replace(/^\//, '').replace(/-|:|\./g, '_') : 'unknown';
}
