import { expect, } from 'chai';
import { objectPath } from 'objects/objectPath';

const obj: any = {};

objectPath(obj, 'a.b.c', 'xxx');

expect(obj).to.haveOwnProperty('a').haveOwnProperty('b').haveOwnProperty('c').to.eq('xxx');

expect(objectPath(obj, 'a.b.c')).to.equals('xxx');
expect(objectPath(obj, 'a.b')).to.haveOwnProperty('c');
expect(objectPath(obj, 'a.x')).is.undefined;



