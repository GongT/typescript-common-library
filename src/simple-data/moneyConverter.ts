export class MoneyConverter {
	constructor(private multiplexer: number) {
	}
	
	// 返回的是实际金额
	get(money: any) {
		const result = parseFloat(money) / this.multiplexer;
		if (isNaN(result)) {
			throw new TypeError('money value not a number: ' + money);
		}
		// console.log('get: convert %s to %s', money, result);
		return parseFloat(result.toFixed(2));
	}
	
	// 参数是实际金额
	set(money: any) {
		const result = parseFloat(money) * this.multiplexer;
		if (isNaN(result)) {
			throw new TypeError('money value not a number: ' + money);
		}
		// console.log('set: convert %s to %s', money, result);
		return parseFloat(result.toFixed(2));
	}
}

