import { getStackFrame, PARENT_FRAME } from 'reflect/getStackFrame';
import { nameFuncAs, nameOfFunc } from 'function/nameOfFunction';
import { IDisposable } from 'types/dispose';

export interface ArgEditor<THIS, VALIST extends any[]> {
	(this: THIS, ...args: VALIST): VALIST;
}

export interface RetEditor<THIS, VALIST extends any[], RET> {
	(this: THIS, ret: RET, ...args: VALIST): RET;
}

export interface PrependFunction<THIS, VALIST extends any[]> {
	(this: THIS, ...args: VALIST): void;
}

export interface AppendFunction<THIS, VALIST extends any[], RET> {
	(this: THIS, ret: RET, ...args: VALIST): void;
}

export interface ErrorHandler<THIS, VALIST extends any[]> {
	(this: THIS, err: Error, ...args: VALIST): Error;
}

const wrapSymbol = Symbol('hasWrapped');

export interface IHasWrapped<THIS, VALIST extends any[], RET> {
	[wrapSymbol]: MonkeyPatch<VALIST, RET, THIS>;
}

interface FnType<THIS, VALIST extends any[], RET> {
	(this: THIS, ...args: VALIST): RET;
}

export class MonkeyPatch<VALIST extends any[], RET, THIS = void> implements IDisposable {
	private readonly original: FnType<THIS, VALIST, RET> & IHasWrapped<THIS, VALIST, RET>;
	private prependList: PrependFunction<THIS, VALIST>[];
	private appendList: AppendFunction<THIS, VALIST, RET>[];
	private returnModify: RetEditor<THIS, VALIST, RET>;
	private argumentsModify: ArgEditor<THIS, VALIST>;
	private errorHandler: ErrorHandler<THIS, VALIST>;
	private detectedName: string;

	public static readonly symbol = wrapSymbol;

	constructor(original: FnType<THIS, VALIST, RET>) {
		if (original.hasOwnProperty(wrapSymbol)) {
			return (original as any)[wrapSymbol];
		}
		this.original = Object.assign(original, {
			[wrapSymbol]: this,
		});
		this.detectedName = nameOfFunc(original);
		if (!this.detectedName) {
			const stackName = getStackFrame(PARENT_FRAME);
			if (stackName.file) {
				if (stackName.line) {
					stackName.file += `:${stackName.line}`;
				}
				if (stackName.column) {
					stackName.file += `:${stackName.column}`;
				}
				this.detectedName = 'functionAt(' + stackName + ')';
			} else {
				this.detectedName = 'anonymous';
			}
		}
	}

	public dispose(): void {
		delete this.original[wrapSymbol];
	}

	transformError(fn: ErrorHandler<THIS, VALIST>) {
		if (this.errorHandler) {
			throw new Error('error handler exists');
		}
		this.errorHandler = fn;
	}

	transformArguments(fn: ArgEditor<THIS, VALIST>) {
		if (this.argumentsModify) {
			throw new Error('argument handler exists');
		}
		this.argumentsModify = fn;
	}

	transformReturn(fn: RetEditor<THIS, VALIST, RET>) {
		if (this.returnModify) {
			throw new Error('return handler exists');
		}
		this.returnModify = fn;
	}

	prepend(fn: PrependFunction<THIS, VALIST>) {
		if (!this.prependList) {
			this.prependList = [];
		}
		this.prependList.unshift(fn);
	}

	append(fn: AppendFunction<THIS, VALIST, RET>) {
		if (!this.appendList) {
			this.appendList = [];
		}
		this.appendList.push(fn);
	}

	buildFunction(): FnType<THIS, VALIST, RET> {
		const self = this;
		const wrappedFunction = function (this: THIS, ...args: VALIST): RET {
			if (self.argumentsModify) {
				args = self.argumentsModify.apply(this, args);
			}

			if (self.prependList) {
				self.prependList.forEach((cb) => {
					cb.apply(this, args);
				});
			}
			let ret: RET;
			if (self.errorHandler) {
				try {
					ret = self.original.apply(this, args);
				} catch (e) {
					throw self.errorHandler.call(this, e, ...args);
				}
			} else {
				ret = self.original.apply(this, args);
			}

			if (self.appendList) {
				self.appendList.forEach((cb) => {
					cb.call(this, ret, ...args);
				});
			}
			if (self.returnModify) {
				return self.returnModify.call(this, ret, ...args);
			}
			return ret;
		};

		return nameFuncAs(`MonkeyPatch(${this.detectedName})`, Object.assign(wrappedFunction, {
			[wrapSymbol]: this,
		}));
	}
}
