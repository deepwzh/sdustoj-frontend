#!/bin/sh
echo "javascript"
find src -name "*.js*" | xargs cat | wc -l;
echo "css"
find src -name "*.css*" | xargs cat | wc -l;

