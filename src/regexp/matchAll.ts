export function matchAll(re: RegExp, s: string) {
	const ret: RegExpExecArray[] = [];
	while (true) {
		const m = re.exec(s);
		if (m) {
			ret.push(m);
		} else {
			return ret;
		}
	}
}