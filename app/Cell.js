'use strict';

const category = 'Cell',
    LocationFactory = require('./Location'),
    Privacy = require('./Privacy'),
    privates = new WeakMap();

class Cell extends Privacy
{
    constructor (location) {
        super();
        privates.set(this, {
            location: location || LocationFactory.origin()
        });
    }

    get isAlive () {
        return false;
    }

    /** @abstract */
    isAliveInNextGeneration () {
        throw new ReferenceError('Abstract method invocation. ' +
            'Should be implemented by a derived class.');
    }

    get location () {
        return privates.get(this).location;
    }

    getNeighborCount () {
        // need access to the world's locations
        return this.location.getNeighbors().length;
    }

    /** @override */
    toDebugString (mine, className) {
        return super.toDebugString(mine || privates, className || category) +
            ' isa ' + super.toDebugString();
    }
}

module.exports = Cell;
