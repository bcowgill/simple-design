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

        /** @abstract */
        abstractUnimplemented () {
            this._abstractError();
        }

        /** @override */
        toDebugString (privates, className) {
            return super.toDebugString(privates || secrets, className || category) +
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

    describe('Privacy', function () {
        it('should be unable to see private data', function () {
            expect(util.inspect(this.object))
                .to.be.equal('Privacy {}');
        });

        it('should format privates in a nice debug string', function () {
            expect(this.object.toDebugString(this.privates))
                .to.be.equal('Privacy { private: true }');
        });

        it('should provide inheritance information', function () {

            expect(this.object._inherits())
                .to.be.deep.equal({
                    chain: [ 'Privacy' ],
                    classes: { 'Privacy': true }
                });
        });

        it('should provide class name', function () {
            expect(this.object._className)
                .to.deep.equal('Privacy');
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
    });

    describe('Secret isa Private', function () {

        beforeEach(function () {
            this.secret = new Secret('quiet');
        });

        it('should be unable to see private data for derived classes', function () {

            expect(util.inspect(this.secret))
                .to.be.equal('Secret {}');
        });

        it('should provide class name for derived classes', function () {

            expect(this.secret._className)
                .to.deep.equal('Secret');
        });

        it('should provide inheritance information for derived classes', function () {

            expect(this.secret._inherits())
                .to.be.deep.equal({
                chain: [ 'Secret', 'Privacy' ],
                classes: {
                    Secret: true,
                    Privacy: true
                }
            });
        });

        it('derived class should provide cloned privates for debugger inspection', function () {

            expect(this.secret._private())
                .to.be.deep.equal({
                    Privacy: {},
                    Secret: {
                        secret: 'quiet',
                        add: 'value'
                    }
                });
        });

        it('should set privates for derived classes', function () {

            expect(this.secret.secret).to.be.equal('quiet');
            expect(this.secret.toDebugString())
                .to.be.equal('Secret { secret: \'quiet\', ' +
                'add: \'value\' } isa Privacy {}');
        });

        it('should throw a ReferenceError when trying to invoke an ' +
            'unimplemented abstract/virtual method', function () {

            var self = this;

            expect(function () {
                self.secret.abstractUnimplemented();
            }).to.throw(ReferenceError);

            expect(function () {
                self.secret.abstractUnimplemented();
            }).to.throw('Abstract method invocation. Should be implemented by a derived class.');

        });
    });
});
