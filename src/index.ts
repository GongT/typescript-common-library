import { memorize } from 'pattern/memorize';

declare const console: any;

class Test {
	@memorize
	get data() {
		return Math.random();
	}

	set data(v: number) {}

	@memorize
	method(a: string) {
		console.log('call method: ', a);
		return 'wow' + Math.random();
	}
}

const x = new Test();
console.log(x.data);
console.log(x.data);
x.data = 1;
console.log(x.data);
const y = new Test();
console.log(y.data);
console.log(y.method('1'));
console.log(y.method('2'));

console.log(x.method('1'));
console.log(x.method('2'));
