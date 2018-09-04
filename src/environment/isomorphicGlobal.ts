import { isNode } from 'environment/platform';

declare const global: any;
declare const window: any;

export const isomorphicGlobal = isNode? global : window;
