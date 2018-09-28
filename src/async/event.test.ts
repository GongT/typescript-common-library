import { Emitter } from 'async/event';
import { expect } from 'chai';

const e1 = new Emitter;
expect(() => {
	e1.event(1);
}).to.throw(); // not function
