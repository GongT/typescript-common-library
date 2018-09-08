export function symbolCode(s: symbol | Symbol, global: boolean) {
	return s.toString()
	        .replace(/^Symbol\(/, global? 'Symbol.for(\'' : 'Symbol(\'')
	        .replace(/\)$/, '\')');
}