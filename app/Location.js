'use strict';

const category = 'Location',
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

    get x () {
        return privates.get(this).x;
    }

    get y () {
        return privates.get(this).y;
    }

    toString () {
        return '(' + this.x + ', ' + this.y + ')';
    }

    isSame (location) {
        return this.x === location.x &&
            this.y === location.y;
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
    toDebugString (mine, className) {
        return super.toDebugString(mine || privates, className || category) +
            ' isa ' + super.toDebugString();
    }
}

_makeWithOffset = function (x, y) {
    return new Location(this.x + x,  this.y + y);
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