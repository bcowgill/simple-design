'use strict';

const category = 'Location',
    noop = require('node-noop').noop,
    Privacy = require('./Privacy'),
    privates = new WeakMap();

var _makeWithOffset, _v;

class Location extends Privacy
{
    constructor (x, y) {
        super();
        privates.set(this, {
            x: _v(x),
            y: _v(y)
        });
    }

    toString () {
        const _private = privates.get(this);
        return `(${_private.x}, ${_private.y})`;
    }

    ifSameAs (location, callIfSame, callIfDiffers) {
        callIfSame = callIfSame || noop;
        callIfDiffers = callIfDiffers || noop;

        const _private = privates.get(this);
        const _their = privates.get(location);
        if (_private.x === _their.x &&
            _private.y === _their.y) {
            callIfSame();
        }
        else
        {
            callIfDiffers();
        }
    }

    getNeighbors () {
        return [
            _makeWithOffset.apply(this, [-1, -1]),
            _makeWithOffset.apply(this, [-1,  0]),
            _makeWithOffset.apply(this, [-1,  1]),

            _makeWithOffset.apply(this, [ 0, -1]),
            _makeWithOffset.apply(this, [ 0,  1]),

            _makeWithOffset.apply(this, [ 1, -1]),
            _makeWithOffset.apply(this, [ 1,  0]),
            _makeWithOffset.apply(this, [ 1,  1]),
        ];
    }

    /** @override */
    toDebugString (into, derivedPrivates, derivedClassName) {
        return super.toDebugString(into, derivedPrivates || privates,
            derivedClassName || category);
    }

    /** @override */
    _inherits (into) {
        into = super._inherits(into);
        into.chain.unshift(category);
        into.classes[category] = true;
        return into;
    }

    /** @override */
    _private (into, derivedPrivates, derivedClassName) {
        into = super._private(into, derivedPrivates || privates, derivedClassName || category);
        return super._private(into);
    }
}

_makeWithOffset = function (x, y) {
    const _private = privates.get(this);
    return new Location(_private.x + x,  _private.y + y);
};

// don't override 0 as a default value!
_v = function (value, defaultValue) {
    if (!defaultValue) {
        defaultValue = 0;
    }
    if (!value) {
        value = defaultValue;
    }
    return value;
};

class LocationFactory {
    origin () {
        return new Location();
    }

    at (x, y) {
        return new Location(x, y);
    }

    random (size) {
        size = size ? Math.floor(size) : 10;
        return new Location(Math.floor(size * Math.random() + 0.5),
            Math.floor(size * Math.random() + 0.5));
    }
}

module.exports = new LocationFactory();