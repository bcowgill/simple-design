'use strict';

const category = 'EmptyCell',
    Cell = require('./Cell');

var _isFertileNeighborhood;

class EmptyCell extends Cell
{
    constructor (location) {
        super(location);
    }

    /** @override */
    isAliveInNextGeneration () {
        return _isFertileNeighborhood.call(this);
    }

    /** @override */
    toDebugString (mine, className) {
        return super.toDebugString(mine, className || category) +
            ' isa ' + super.toDebugString();
    }
}

_isFertileNeighborhood = function () {
    const neighbors = this.getNeighborCount();
    return neighbors === 3;
};

module.exports = EmptyCell;
