export function objectPath(obj: any, path: string): any {
	path.split('.').every((name) => {
		return obj = obj[name];
	});
	return obj;
}
