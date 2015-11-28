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
    get glyph () {
        return '␠'; // U+2420 [OtherSymbol] SYMBOL FOR SPACE
        // ' '	U+20	[SpaceSeparator]	SPACE
        // '　'	U+3000	[SpaceSeparator]	IDEOGRAPHIC SPACE
        // '〿'	U+303F	[OtherSymbol]	IDEOGRAPHIC HALF FILL SPACE
        // ' '	U+A0	[SpaceSeparator]	NO-BREAK SPACE
    }

    /** @override */
    isAliveInNextGeneration () {
        return _isFertileNeighborhood.call(this);
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

_isFertileNeighborhood = function () {
    const neighbors = this.getNeighborCount();
    return neighbors === 3;
};

module.exports = EmptyCell;
