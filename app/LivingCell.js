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
    toDebugString (mine, className) {
        const privates = void 0; // no private data yet
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
        const privates = void 0; // no private data yet
        into = super._private(into, mine || privates, className || category);
        return super._private(into);
    }
}

_isStableNeighborhood = function () {
    const neighbors = this.getNeighborCount();
    return neighbors === 2 || neighbors === 3;
};

module.exports = LivingCell;
