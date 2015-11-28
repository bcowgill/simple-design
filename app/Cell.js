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
    get glyph () {
        return this._abstractError();
    }

    /** @abstract */
    isAliveInNextGeneration () {
        return this._abstractError();
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
        const myDebug = super.toDebugString(mine || privates, className || category),
            myParentDebug = super.toDebugString();
        return `<${myDebug} isa ${myParentDebug}>`;
    }

    /** @override */
    _inherits (into) {
        into = super._inherits(into);
        into.chain.unshift(category);
        into.classes[category] = true;
        return into;
    }

    /** @override */
    _private (into, mine, className) {
        into = super._private(into, mine || privates, className || category);
        return super._private(into);
    }
}

module.exports = Cell;
