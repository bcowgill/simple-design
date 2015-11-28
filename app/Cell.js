'use strict';

const category = 'Cell',
    LocationFactory = require('./Location'),
    privates = new WeakMap();

var _setPrivate;

class Cell
{
    constructor (location) {
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

    toDebugString () {
        const util = require('util'),
            SHOW_HIDDEN = true,
            INFINITE_DEPTH = null,
            COLORIZE = true;
        return category + ' ' + util.inspect(privates.get(this),
                SHOW_HIDDEN, INFINITE_DEPTH, COLORIZE);
    }
}

_setPrivate = function (key, value) {
    const _privates = privates.get(this);
    _privates[key] = value;
    return this;
};

module.exports = Cell;
