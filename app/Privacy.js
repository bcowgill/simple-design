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
    toDebugString (into, derivedPrivates, derivedClassName) {
        derivedClassName = derivedClassName || category;
        const inherits = this._inherits().chain.join('->'),
            _private = this._private(into,  derivedPrivates, derivedClassName);

        var dump = util.inspect(_private,
                debugFormat.showHidden,
                debugFormat.depth,
                debugFormat.colorize);
        dump = dump.replace(/,\s+Privacy: {}/, '');

        return `<${inherits}\n${dump}>`;
    }

    get _className () {
        return this._inherits().chain[0];
    }

    /** @abstract */
    _inherits (into) {
        into = into || { chain: [], classes: {} };
        into.chain.unshift(category);
        into.classes[category] = true;
        return into;
    }

    /** @abstract */
    _private (into, derivedPrivates, derivedClassName) {
        into = into || {};
        derivedClassName = derivedClassName || category;
        derivedPrivates = (derivedPrivates && derivedPrivates.get) ?
            derivedPrivates.get(this) : {};
        into[derivedClassName] = JSON.parse(JSON.stringify(derivedPrivates));
        return into;
    }

    /** @protected */
    _setPrivate (derivedPrivates, key, value) {
        const _privates = derivedPrivates.get(this);
        _privates[key] = value;
        return this;
    }

    /** @protected */
    _abstractError () {
        throw new ReferenceError('Abstract method invocation. ' +
            'Should be implemented by a derived class.');
    }

}

module.exports = Privacy;