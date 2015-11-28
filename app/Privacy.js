/* jshint maxcomplexity: 4 */
'use strict';

const category = 'Privacy',
    util = require('util'),
    INFINITE = null,
    debugFormat = {
        showHidden: true,
        depth: INFINITE,
        colorize: true
    };

class Privacy {
    constructor () {
    }

    /** @public */
    getStaticDebugFormat () {
        return JSON.parse(JSON.stringify(debugFormat));
    }

    /** @public */
    setStaticDebugFormat (options) {
        Object.keys(debugFormat).forEach(function (key) {
            if (key in options) {
                debugFormat[key] = options[key];
            }
        });
    }

    /** @abstract */
    toDebugString (privates, className) {
        className = className || category;
        privates = privates ? privates.get(this) : {};
        return className + ' ' + util.inspect(privates,
                debugFormat.showHidden,
                debugFormat.depth,
                debugFormat.colorize);
    }

    /** @protected */
    _setPrivate (privates, key, value) {
        const _privates = privates.get(this);
        _privates[key] = value;
        return this;
    }

    /** @abstract */
    _private (into, privates, className) {
        into = into || {};
        className = className || category;
        privates = privates ? privates.get(this) : {};
        into[className] = JSON.parse(JSON.stringify(privates));
        return into;
    }
}

module.exports = Privacy;