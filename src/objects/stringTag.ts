export function assignStringTag<T>(object: T, tag: string) {
	Object.assign(object, {
		[Symbol.toStringTag]: tag,
	});
}

export function StringTag(tag: string): ClassDecorator {
	return function <T extends Function>(cls: T) {
		assignStringTag(cls.prototype, tag);
	};
}