# Experiments from reading the book "Understanding the Four Rules of Simple Design" by Corey Haines 

Contains an infant form of a Privacy class to use WeakMaps in ECMAscript 6 to 
provide private member properties for classes while still providing the 
ability to see the private data while debugging.

This class framework is then used to implement classes for the Game of Life by Conway.

Features of Privacy base class:

1. WeakMaps for storing private data is memory leak safe.
1. ECMAscript 6 class keyword used.
1. toDebugString() method for dumping object info when debugging.
1. _inherits() method to get inheritance chain and inhertied classes.
1. _private() method to get a read only copy of private data for debugging.
1. _className property
1. _abstractError() method to throw a ReferenceError if derived classes don't implement your abstract/virtual methods.

## Pre-requisites

Install a recent version of [Node.js and Node package manager (npm)](http://nodejs.org) via your preferred method.

Install nvm and then install node version 4.2.1 or newer for ECMA6 support. (https://github.com/creationix/nvm)

    echo v4.2.1 > ~/.nvmrc
    nvm install v4.2.1
    nvm use v4.2.1

## License

Unlicense see LICENCE file or http://unlicense.org

## Setup

In the project directory, launch:

    sudo npm install -g nodemon forever jshint grunt node-inspector
    npm install

You'll need to do this once or when dependencies change.

## Test

Jshint checking and tests:

    npm run pretest

    npm test

or peruse the **Gruntfile.js** for other development related tasks like watching, and test coverage

Test Driven Development:

    grunt tdd --watch test
   
Will re-run the tests on every code change, but will not JSHINT so make sure you
do a normal grunt before committing your code.

Code Coverage:

    grunt or grunt coverage
    npm run coverage-view
    npm run covereach

The grunt command will generate code coverage which you can view in the browser.
We will set coverage points quite high and the build will fail if they are not met.

The covereach command will run each test plan individually and show coverage. The
module under test should be as close to 100% covered by the single test plan as is possible.

## Debugging

To visually debug without an IDE install node-inspector and use the Chrome
or Opera debugger to debug your code.

    npm run debugger
    npm run debuggertest




.
