'use strict';

const category = 'DeadCell',
    EmptyCell = require('./EmptyCell');

class DeadCell extends EmptyCell
{
    constructor (location) {
        super(location);
    }

    /** @override */
    get glyph () {
        return '☠'; // U+2620 [OtherSymbol] SKULL AND CROSSBONES
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

module.exports = DeadCell;
