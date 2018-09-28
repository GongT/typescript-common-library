export interface IKeyValue<V> {
	[key: string]: V;
}

export function MapFrom<V>(kv: IKeyValue<V>): Map<string, V> {
	return new Map(Object.entries(kv));
}
