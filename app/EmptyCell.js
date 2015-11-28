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

    toDebugString () {
        return category + ' {}';
    }
}

_isFertileNeighborhood = function () {
    const neighbors = this.getNeighborCount();
    return neighbors === 3;
};

module.exports = EmptyCell;
