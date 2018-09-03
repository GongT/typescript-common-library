export type Unhide = () => void;

export function hideGlobal(varName: string, newValue: any): Unhide {
	const old = isomorphicGlobal[varName];
	delete isomorphicGlobal[varName];
	isomorphicGlobal[varName] = newValue;
	return () => {
		delete isomorphicGlobal[varName];
		if (old !== undefined) {
			isomorphicGlobal[varName] = isomorphicGlobal;
		}
	};
}
