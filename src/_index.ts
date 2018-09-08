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
//// - async/awaitIterator
export { awaitIterator } from 'async/awaitIterator';
//// - async/cancelable
export { Cancelable } from 'async/cancelable';
export { CancelError } from 'async/cancelable';
//// - async/promise
export { IResolver } from 'async/promise';
export { IRejector } from 'async/promise';
export { IResolveHandlerT } from 'async/promise';
export { IRejectHandlerT } from 'async/promise';
export { Thenable } from 'async/promise';
export { IAsyncWorker } from 'async/promise';
//// - async/working
export { Working } from 'async/working';
//// - async/deferred
export { Deferred } from 'async/deferred';
//// - async/timer
export { Timeout } from 'async/timer';
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
//// - network/fetch
export { fetchJSON } from 'network/fetch';
//// - objects/hiddenProperty
export { hiddenProperty } from 'objects/hiddenProperty';
//// - objects/inspect
export { assignInspectContent } from 'objects/inspect';
export { InspectContent } from 'objects/inspect';
//// - objects/memorize
export { memorize } from 'objects/memorize';
//// - objects/objectPath
//// - objects/stringTag
export { assignStringTag } from 'objects/stringTag';
export { StringTag } from 'objects/stringTag';
//// - strings/symbolCode
export { symbolCode } from 'strings/symbolCode';
//// - pattern/globalVariable
export { GlobalVariable } from 'pattern/globalVariable';
//// - pattern/hideGlobal
export { hideGlobal } from 'pattern/hideGlobal';
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
//// - pattern/simpleArrayRegistry
export { RegexpFinder } from 'pattern/simpleArrayRegistry';
export { SimpleArrayRegistry } from 'pattern/simpleArrayRegistry';
//// - pattern/singletonClass
export { Singleton } from 'pattern/singletonClass';
export { SingletonOf } from 'pattern/singletonClass';
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
/*
{
    "baseIndentSize": 0,
    "indentSize": 4,
    "tabSize": 4,
    "indentStyle": 2,
    "newLineCharacter": "\n",
    "convertTabsToSpaces": false,
    "insertSpaceAfterCommaDelimiter": true,
    "insertSpaceAfterSemicolonInForStatements": true,
    "insertSpaceBeforeAndAfterBinaryOperators": true,
    "insertSpaceAfterConstructor": false,
    "insertSpaceAfterKeywordsInControlFlowStatements": true,
    "insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
    "insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": false,
    "insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,
    "insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true,
    "insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": false,
    "insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": false,
    "insertSpaceAfterTypeAssertion": false,
    "insertSpaceBeforeFunctionParenthesis": false,
    "placeOpenBraceOnNewLineForFunctions": false,
    "placeOpenBraceOnNewLineForControlBlocks": false,
    "insertSpaceBeforeTypeAnnotation": false
}
*/