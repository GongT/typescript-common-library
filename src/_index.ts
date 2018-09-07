declare module "@gongt/common" {
//// - array/arrayDiff
export { IArrayDiff } from 'array/arrayDiff';
export { arrayDiff } from 'array/arrayDiff';

//// - array/arraySame
export { arraySame } from 'array/arraySame';

//// - array/removeItems
export { removeItems } from 'array/removeItems';

//// - array/removeAll
export { removeAll } from 'array/removeAll';

//// - array/removeOne
export { removeOne } from 'array/removeOne';

//// - strings/pad
export { pad2 } from 'strings/pad';
export { indent } from 'strings/pad';
export { indentTabs } from 'strings/pad';
export { empty } from 'strings/pad';

//// - datetime/datePath
export { datePath } from 'datetime/datePath';

//// - datetime/dumpDate
export { YMDHMS } from 'datetime/dumpDate';
export { YMD } from 'datetime/dumpDate';
export { HMS } from 'datetime/dumpDate';

//// - environment/platform

//// - environment/isomorphicGlobal

//// - environment/posixPath
export { posixPath } from 'environment/posixPath';

//// - function/bodyOfFunc
export { bodyOfFunc } from 'function/bodyOfFunc';

//// - function/callback-list
export { CallbackList } from 'function/callback-list';

//// - function/isNoopFunc
export { isNoopFunc } from 'function/isNoopFunc';

//// - function/nameOfFunction
export { nameOfConstructor } from 'function/nameOfFunction';
export { nameOfFunc } from 'function/nameOfFunction';
export { nameFuncAs } from 'function/nameOfFunction';
export { renameFuncAs } from 'function/nameOfFunction';

//// - pattern/awaitIterator
export { awaitIterator } from 'pattern/awaitIterator';

//// - pattern/deferred
export { IResolver } from 'pattern/deferred';
export { Deferred } from 'pattern/deferred';

//// - pattern/globalVariable
export { GlobalVariable } from 'pattern/globalVariable';

//// - pattern/hideGlobal
export { hideGlobal } from 'pattern/hideGlobal';

//// - pattern/memorize
export { memorize } from 'pattern/memorize';

//// - pattern/memorize.test
// ignore by default

//// - reflect/getStackFrame
export { getStackFrame } from 'reflect/getStackFrame';
export { getStackFrames } from 'reflect/getStackFrame';

//// - types/dispose
export { IDisposable } from 'types/dispose';

//// - pattern/monkeyPatch
export { ArgEditor } from 'pattern/monkeyPatch';
export { RetEditor } from 'pattern/monkeyPatch';
export { PrependFunction } from 'pattern/monkeyPatch';
export { AppendFunction } from 'pattern/monkeyPatch';
export { ErrorHandler } from 'pattern/monkeyPatch';
export { IHasWrapped } from 'pattern/monkeyPatch';
export { MonkeyPatch } from 'pattern/monkeyPatch';

//// - pattern/monkeyPatch.test
// ignore by default

//// - pattern/objectPath
export { objectPath } from 'pattern/objectPath';

//// - pattern/simpleArrayRegistry
export { RegexpFinder } from 'pattern/simpleArrayRegistry';
export { SimpleArrayRegistry } from 'pattern/simpleArrayRegistry';

//// - pattern/singletonClass
export { Singleton } from 'pattern/singletonClass';
export { SingletonOf } from 'pattern/singletonClass';

//// - pattern/timer
export { timeout } from 'pattern/timer';

//// - pattern/waitCounter
export { WaitCounter } from 'pattern/waitCounter';

//// - regexp/escapeRegExp
export { escapeRegExp } from 'regexp/escapeRegExp';

//// - reflect/errorStackHint
export { errorStackHint } from 'reflect/errorStackHint';
export { createErrorStackHint } from 'reflect/errorStackHint';

//// - regexp/neverMatching

//// - regexp/joinRegexp
export { joinRegexp } from 'regexp/joinRegexp';

//// - simple-data/moneyConverter
export { MoneyConverter } from 'simple-data/moneyConverter';

//// - strings/castCase
export { camelCase } from 'strings/castCase';
export { ucfirst } from 'strings/castCase';
export { lcfirst } from 'strings/castCase';
export { linux_case } from 'strings/castCase';
export { linux_case_hyphen } from 'strings/castCase';

}