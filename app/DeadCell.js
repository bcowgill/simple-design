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
    toDebugString (mine, className) {
        const privates = void 0; // no private data yet
        return super.toDebugString(mine || privates, className || category) +
            ' isa ' + super.toDebugString();
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

module.exports = DeadCell;
