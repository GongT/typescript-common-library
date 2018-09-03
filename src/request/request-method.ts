export enum REQUEST_METHOD {
	GET = 1,
	POST,
	DELETE,
	PUT,
	OPTIONS,
}
export function getRequestTypeName(m: REQUEST_METHOD) {
	return REQUEST_METHOD[m] && REQUEST_METHOD[m].toUpperCase();
}
