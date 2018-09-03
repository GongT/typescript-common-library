/** @internal
 * @deprecated
 * */
export function pad(num: number) {
	return num > 9? num.toFixed(0) : '0' + num.toFixed(0);
}

export function pad2(num: number) {
	return num > 9? num.toFixed(0) : '0' + num.toFixed(0);
}

export function indent(str: string, num: number, prompt = '') {
	const tab = prompt + empty(num);
	return tab + str.replace(/\n/g, '\n' + tab);
}

export function indentTabs(str: string, num: number, prompt = '') {
	const b = new Buffer(num);
	b.fill('\t');
	const tab = prompt + b.toString();
	return tab + str.replace(/\n/g, '\n' + tab);
}

export function empty(num: number) {
	const b = new Buffer(num);
	b.fill(' ');
	return b.toString();
}
