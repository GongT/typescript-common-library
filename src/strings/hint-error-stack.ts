import {escapeRegExp} from "./escape-regexp";
declare const process;

export function hintErrorStack(stack: string|Error, lines: number = 4) {
	const ls = createErrorStackHint(stack, lines);
	
	if (ls[1]) {
		ls[1] = '\x1B[2m' + ls[1];
	}
	
	console.error(ls.join('\n') + '\x1B[0m');
}

export function createErrorStackHint(stack: string|Error, lines: number = 4, start: number = 0): string[] {
	if (stack instanceof Error) {
		stack = stack.stack;
	}
	
	const r = new RegExp(escapeRegExp(process.cwd()), 'g');
	
	return stack
		.replace(r, '.')
		.split(/\n/g)
		.slice(start, start + lines);
}
