export const regLineComment = /\/\/.*$/mg;
export const regBlockComment = /\/\*.*\*\//msg;

export function removeComments(str: string) {
	return str.replace(regLineComment, '').replace(regBlockComment, '');
}
