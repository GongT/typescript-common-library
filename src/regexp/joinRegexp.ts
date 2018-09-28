import { neverMatching } from 'regexp/neverMatching';

export function joinRegexp(...reg: RegExp[]): RegExp {
	if (reg.length === 0) {
		return neverMatching;
	}
	return new RegExp(reg.map(r => `(?:${r.source})`).join('|'), reg[0].flags);
}
