#!/usr/bin/env bash

set -e

rm -rf dist/
mkdir dist

export-all-in-one src

rm -f /tmp/compile-result.d.ts
mkfifo /tmp/compile-result.d.ts
tsc -p src/tsconfig.d.json --outFile /tmp/compile-result.d.ts &

NAME=$(node -p "require('./package.json').name")
{
	echo -e "declare module '${NAME}' {\n"
	cat /tmp/compile-result.d.ts | \
		sed '/declare module "_index" {/,/^}/d' | \
		grep -vE '^\s+import\s+' | \
		grep -vE '^declare module ' | grep -vE '^}'
	echo -e "}"
} > dist/_index.d.ts

rm -f /tmp/compile-result.d.ts

rollup -c build/rollup.config.js
