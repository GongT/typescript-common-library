#!/usr/bin/env bash

set -e

rm -f /tmp/compile-result.d.ts
mkfifo /tmp/compile-result.d.ts
tsc -p src/tsconfig.d.json --outFile /tmp/compile-result.d.ts &

NAME=$(node -p "require('./package.json').name")
{
	echo "module "${NAME}" {\n"
	cat /tmp/compile-result.d.ts | grep -vE '^declare module ' | grep -vE '^}'
	echo "}"
} > dist/_index.d.ts

rm -f /tmp/compile-result.d.ts
