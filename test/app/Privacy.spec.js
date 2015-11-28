'use strict';

const Privacy = require('.').Privacy,
    util = require('util'),
    category = 'Secret',
    secrets = new WeakMap(),
    debugFormat = (new Privacy()).getStaticDebugFormat();

describe('Privacy', function () {

    class Secret extends Privacy {
        /* jshint maxcomplexity: 4 */
        constructor (secret) {
            super();
            secrets.set(this, {
                secret: secret || 'shhh'
            });

            this._setPrivate(secrets, 'add', 'value');
            return this;
        }

        get secret () {
            return secrets.get(this).secret;
        }

        /** @override */
        toDebugString (privates, className) {
            return super.toDebugString(privates || secrets, className || category) +
                ' isa ' + super.toDebugString();
        }

        /** @override */
        _private (into, privates, className) {
            into = super._private(into, privates || secrets, className || category);
            return super._private(into);
        }
    }

    beforeEach(function () {
        this.privates = new WeakMap();
        this.object = new Privacy();
        this.privates.set(this.object, { private: true });
        this.object.setStaticDebugFormat({
            colorize: false
        });
    });

    it('should be unable to see private data', function () {
        expect(util.inspect(this.object))
            .to.be.equal('Privacy {}');
    });

    it('should format privates in a nice debug string', function () {
        expect(this.object.toDebugString(this.privates))
            .to.be.equal('Privacy { private: true }');
    });

    it('should provide cloned privates for debugger inspection', function () {
        expect(this.object._private({}, this.privates))
            .to.deep.equal({ Privacy: { private: true } });
    });

    it('should answer with default static debug format', function () {
        expect(debugFormat)
            .to.be.deep.equal({
            depth: null,
            showHidden: true,
            colorize: true
        });
    });

    it('should have set static debug format', function () {
        expect(this.object.getStaticDebugFormat())
            .to.be.deep.equal({
                depth: null,
                showHidden: true,
                colorize: false
            });
    });

    it('should set a private value', function () {

        this.object._setPrivate(this.privates, 'added', true);

        expect(this.object.toDebugString(this.privates))
            .to.be.equal('Privacy { private: true, ' +
                'added: true }');
    });

    it('should be unable to see private data for derived classes', function () {

        var secret = new Secret('quiet');

        expect(util.inspect(secret))
            .to.be.equal('Secret {}');
    });

    it('should set privates for derived classes', function () {

        var secret = new Secret('quiet');

        expect(secret.secret).to.be.equal('quiet');
        expect(secret.toDebugString())
            .to.be.equal('Secret { secret: \'quiet\', ' +
                'add: \'value\' } isa Privacy {}');
    });

    it('derived class should provide cloned privates for debugger inspection', function () {

        var secret = new Secret('quiet');

        expect(secret._private())
            .to.deep.equal({ Secret: { secret: 'quiet', add: 'value' }, Privacy: {} });
    });

});
