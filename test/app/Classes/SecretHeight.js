// SecretHeight.js a class to test and demonstrate an inheritance and applying
// a mixin with private data hiding
'use strict';

const category = 'SecretHeight',
    Secret = require('./Secret'),
    applyHeightMixin = require('./HeightMixin').applyHeightMixin,
    privates = new WeakMap();

class SecretHeight extends Secret {
    constructor (secret, heightMM) {
        super(secret);
        this.HeightMixin.init.call(this, heightMM);
        privates.set(this, {
            relative: 'absolute'
        });
        return this;
    }

    /** @override */
    _inherits (into) {
        into = super._inherits(into);
        into.chain.push(':HeightMixin');
        into.chain.unshift(category);
        into.classes[category] = true;
        into.classes.HeightMixin = true;
        return into;
    }

    /** @override */
    _private (into, derivedPrivates, derivedClassName) {
        /* jshint maxcomplexity: 3 */
        into = super._private(into,
            derivedPrivates || privates, derivedClassName || category);
        this.HeightMixin._private.call(this, into);
        return super._private(into);
    }

}
applyHeightMixin.call(SecretHeight.prototype);

module.exports = SecretHeight;
