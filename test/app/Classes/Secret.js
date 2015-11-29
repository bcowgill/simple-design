// Secret.js a class to test and demonstrate inheritance with private data hiding
'use strict';

const category = 'Secret',
    Privacy = require('.').Privacy,
    privates = new WeakMap();

class Secret extends Privacy {
    /* jshint maxcomplexity: 4 */
    constructor (secret) {
        super();
        privates.set(this, {
            secret: secret || 'shhh'
        });

        this._setPrivate(privates, 'add', 'value');
        return this;
    }

    get secret () {
        return privates.get(this).secret;
    }

    /** @abstract */
    abstractUnimplemented () {
        this._abstractError();
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
        into = super._private(into, derivedPrivates || privates, derivedClassName || category);
        return super._private(into);
    }
}

module.exports = Secret;