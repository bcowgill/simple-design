#!/bin/bash
# grab files from previous node project to start a new one

SRC=../node-dictionaries

mkdir -p doc test/app app

cp $SRC/package.json $SRC/.npmignore $SRC/.gitignore $SRC/.jshint* \
    $SRC/README.md $SRC/Gruntfile.js \
    ./

cp $SRC/test/setup.js $SRC/test/.jshint* \
    test/

