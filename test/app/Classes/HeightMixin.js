// HeightMixin.js a decorator function to test and demonstrate a mixin with private data hiding
'use strict';

const category = 'HeightMixin',
    Privacy = require('.').Privacy,
    privates = new WeakMap();

// Cached Functional Mixin pattern
// https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/

const applyHeightMixin = (function HeightMixinDecorator () {
    // category, privates could be defined here for greater hiding.

    /* jshint -W040 */ // Possible strict violation.
    function initHeightMixin (height) {
        privates.set(this, {
            height: height
        });
    }

    function getHeight () {
        return privates.get(this).height + 'mm';
    }
    /* jshint +W040 */ // Possible strict violation.

    return function HeightMixin () {
        // 'this' should be a Class.prototype
        this[category] = {
            init: initHeightMixin,
            _private: function (into, derivedPrivates, derivedClassName) {
                /* jshint maxcomplexity: 3 */
                Privacy.prototype._private.call(this, into,
                    derivedPrivates || privates, derivedClassName || category);
            }
        };
        Object.defineProperty(this[category], '_className', {
            value: category,
            enumerable: false,
            configurable: false,
            writable: false
        });
        Object.defineProperty(this, 'height', {
            get: getHeight,
            enumerable: false,
            configurable: false,
        });
        return this;
    };
})();

module.exports = {
    applyHeightMixin: applyHeightMixin
};
