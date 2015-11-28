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
    get isAlive () {
        return true;
    }

    /** @override */
    isAliveInNextGeneration () {
        return _isStableNeighborhood.call(this);
    }

    toDebugString () {
        return category + ' {}';
    }
}

_isStableNeighborhood = function () {
    const neighbors = this.getNeighborCount();
    return neighbors === 2 || neighbors === 3;
};

module.exports = LivingCell;
