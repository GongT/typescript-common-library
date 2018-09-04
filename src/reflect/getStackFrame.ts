const errorFrame = /^\s*at (\S+)(?: \[as (\S+)\])?(?: \((.+?)(?::(\d+))?(?::(\d+))?\))?$/um;

export type IStackInfo = Partial<{
	name: string;
	alias: string;
	file: string;
	line: number;
	column: number;
}>

export const CURRENT_FRAME = 1;
export const PARENT_FRAME = 2;

export function getStackFrame(level: number): IStackInfo {
	const err = new Error;
	const line = err.stack.split(/\n/g, level + 2)[level + 1] || '';
	const m = errorFrame.exec(line);
	if (m) {
		return {
			name  : m[1],
			alias : m[2],
			file  : m[3],
			line  : parseInt(m[4]),
			column: parseInt(m[5]),
		};
	} else {
		return {};
	}
}

export function getStackFrames(): IStackInfo[] {
	const err = new Error;
	return err.stack.split(/\n/g).slice(2).map((line) => {
		const m = errorFrame.exec(line);
		if (m) {
			return {
				name  : m[1],
				alias : m[2],
				file  : m[3],
				line  : parseInt(m[4]),
				column: parseInt(m[5]),
			};
		} else {
			return {};
		}
	});
}