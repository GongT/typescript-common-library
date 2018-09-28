export function bodyOfFunc(func: Function) {
	const body = func.toString();
	return body.slice(body.indexOf('{') + 1, body.lastIndexOf('}')).trim();
}
