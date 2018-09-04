import 'source-map-support/register';

import { assert } from 'chai';
import { MonkeyPatch } from 'pattern/monkeyPatch';
import { nameOfFunc } from 'function/nameOfFunction';

let error = false;

function someFunc(a: string, b: number): string {
	if (error) {
		throw new Error('A');
	}
	return a + ':' + b.toString();
}

const THIS = Symbol('xxx');

const A = 'X';
const B = 1000;

const p = new MonkeyPatch(someFunc);

const fn = p.buildFunction();

assert.equal(new MonkeyPatch(fn), p);
assert.equal(nameOfFunc(fn), 'MonkeyPatch(someFunc)');

p.transformArguments(function (a: string, b: number) {
	assert.equal(b, 666);
	assertCommon(this, a, B);
	return [a, B];
});

let prependCalled = 0;
p.prepend(function (a: string, b: number) {
	prependCalled++;
});
p.prepend(function (a: string, b: number) {
	prependCalled++;
	assertCommon(this, a, b);
});

let appendCalled = 0;
p.append(function (ret: string, a: string, b: number) {
	appendCalled++;
});
p.append(function (ret: string, a: string, b: number) {
	appendCalled++;
	assertCommon(this, a, b);
	assert.equal(ret, someFunc(A, B));
});

p.transformError(function (e: Error, a: string, b: number) {
	assertCommon(this, a, b);
	assert.equal(e.message, 'A');
	e.message += ' TEST HERE';
	return e;
});
p.transformReturn(function (ret: string, a: string, b: number) {
	assertCommon(this, a, b);
	assert.equal(ret, someFunc(A, B));
	return 'FOOL';
});

const RET = fn.call(THIS, A, 666);
assert.equal(RET, 'FOOL');
assert.equal(prependCalled, 2);
assert.equal(appendCalled, 2);

try {
	error = true;
	fn.call(THIS, A, 666);
} catch (e) {
	assert.equal(e.message, 'A TEST HERE');
}

function assertCommon(self: any, a: any, b: any) {
	assert.equal(self, THIS);
	assert.equal(a, A);
	assert.equal(b, B);
}