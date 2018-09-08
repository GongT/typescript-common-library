import { memorize } from 'objects/memorize';

declare const console: any;

class Test {
	constructor(private x: number) {
	}

	@memorize
	get data() {
		this.x += 1;
		return this.x;
	}

	set data(v: number) {}

	@memorize
	method(a: string) {
		this.x += 1;
		return a + (this.x + 100).toFixed(0);
	}
}

const x = new Test(1);
console.assert(x.data === 2);
console.assert(x.data === 2);
x.data = 666;
console.log(x.data === 666);

const y = new Test(1);
console.log(y.data === 2);

console.log(y.method('A') === 'A103');
console.log(y.method('B') === 'A103');

const z = new Test(1);
console.log(z.method('B') === 'B102');
console.assert(z.data === 3);
