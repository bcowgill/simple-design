// Cypher.js a class to test and demonstrate sub-classing with private data hiding
'use strict';

const category = 'Cypher',
    Secret = require('./Secret'),
    privates = new WeakMap();

class Cypher extends Secret {
    /* jshint maxcomplexity: 4 */
    constructor (secret, cypherType) {
        super(secret);
        privates.set(this, {
            cypher: cypherType || 'shhh'
        });

        this._setPrivate(privates, 'type', 'rot13');
        return this;
    }

    get cypher () {
        return privates.get(this).cypher;
    }

    /** @override */
    toDebugString (into, derivedPrivates, derivedClassName) {
        return super.toDebugString(into,
            derivedPrivates || privates, derivedClassName || category);
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
        into = super._private(into,
            derivedPrivates || privates, derivedClassName || category);
        return super._private(into);
    }
}

module.exports = Cypher;