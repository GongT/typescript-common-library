export interface TypedFunction<ARG extends any[], RET = void, THIS = void> {
	(this: THIS, ...args: ARG): RET;
}

export interface NodeStyleCallback<RET> {
	(err?: Error, data?: RET): void;
}