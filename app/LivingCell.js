'use strict';

const category = 'LivingCell',
    Cell = require('./Cell');

var _isStableNeighborhood;

class LivingCell extends Cell
{
    constructor (location) {
        super(location);
    }

    /** @override */
    get glyph () {
        return '☻'; // U+263B BLACK SMILING FACE
    }

    /** @override */
    get isAlive () {
        return true;
    }

    /** @override */
    isAliveInNextGeneration () {
        return _isStableNeighborhood.call(this);
    }

    /** @override */
    toDebugString (into, derivedPrivates, derivedClassName) {
        const privates = {}; // no private data yet
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
        const privates = {}; // no private data yet
        into = super._private(into, derivedPrivates || privates, derivedClassName || category);
        return super._private(into);
    }
}

_isStableNeighborhood = function () {
    const neighbors = this.getNeighborCount();
    return neighbors === 2 || neighbors === 3;
};

module.exports = LivingCell;
