export function objectPath(obj: object, path: string): any {
	path.split('.').every((name) => {
		return obj = obj[name];
	});
	return obj;
}
