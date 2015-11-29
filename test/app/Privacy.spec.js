'use strict';

const Privacy = require('.').Privacy,
    util = require('util'),
    Secret = require('./Classes/Secret'),
    Cypher = require('./Classes/Cypher'),
    SecretHeight = require('./Classes/SecretHeight'),
    debugFormat = (new Privacy()).getStaticDebugFormat();

describe('Privacy', function () {

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
            expect(this.object.toDebugString({}, this.privates))
                .to.be.equal('<Privacy\n{ Privacy: { private: true } }>');
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

            expect(this.object.toDebugString({}, this.privates))
                .to.be.equal('<Privacy\n{ Privacy: { private: true, added: true } }>');
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
        });

        it('should format privates in a nice debug string', function () {
            expect(this.secret.toDebugString())
                .to.be.equal('<Secret->Privacy\n{ Secret: ' +
                    '{ secret: \'quiet\', add: \'value\' } }>');
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
    
    describe('Cypher isa Secret', function () {

        beforeEach(function () {
            this.cypher = new Cypher('quiet', 'hush');
        });

        it('should be unable to see private data for derived classes', function () {

            expect(util.inspect(this.cypher))
                .to.be.equal('Cypher {}');
        });

        it('should provide class name for derived classes', function () {

            expect(this.cypher._className)
                .to.deep.equal('Cypher');
        });

        it('should provide inheritance information for derived classes', function () {

            expect(this.cypher._inherits())
                .to.be.deep.equal({
                chain: [ 'Cypher', 'Secret', 'Privacy' ],
                classes: {
                    Cypher: true,
                    Secret: true,
                    Privacy: true
                }
            });
        });

        it('derived class should provide cloned privates for debugger inspection', function () {

            /*
            console.log('\n', this.cypher._private(), '\n');
            console.log('\n', this.cypher._inherits(), '\n');
            console.log('\n', this.cypher.toDebugString(), '\n');
            */

            expect(this.cypher._private())
                .to.be.deep.equal({
                Privacy: {},
                Secret: {
                    secret: 'quiet',
                    add: 'value'
                },
                Cypher: {
                    cypher: 'hush',
                    type: 'rot13'
                }
            });
        });

        it('should set privates for derived classes', function () {

            expect(this.cypher.secret).to.be.equal('quiet');
        });

        it('should format privates in a nice debug string', function () {
            expect(this.cypher.toDebugString())
                .to.be.equal('<Cypher->Secret->Privacy\n{ ' +
                    'Cypher: { cypher: \'hush\', type: \'rot13\' },\n  ' +
                    'Secret: { secret: \'quiet\', add: \'value\' } }>');
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

    describe('SecretHeight isa Secret, HeightMixin', function () {

        beforeEach(function () {
            this.secretHeight = new SecretHeight('quiet', 22);
        });

        it('should be unable to see private data for derived classes with mixins', function () {

            expect(util.inspect(this.secretHeight))
                .to.be.equal('SecretHeight {}');
        });

        it('should provide class name for derived classes with mixins', function () {

            expect(this.secretHeight._className)
                .to.deep.equal('SecretHeight');
        });

        it('should provide Mixin class name property for derived classes with mixins', function () {

            expect(this.secretHeight.HeightMixin._className)
                .to.deep.equal('HeightMixin');
        });

        it('should provide inheritance information for derived classes with mixins', function () {

            expect(this.secretHeight._inherits())
                .to.be.deep.equal({
                chain: [ 'SecretHeight', 'Secret', 'Privacy', ':HeightMixin' ],
                classes: {
                    SecretHeight: true,
                    Secret: true,
                    HeightMixin: true,
                    Privacy: true
                }
            });
        });

        it('derived class should provide cloned privates for debugger inspection', function () {

            expect(this.secretHeight._private())
                .to.be.deep.equal({
                Privacy: {},
                Secret: {
                    secret: 'quiet',
                    add: 'value'
                },
                SecretHeight: {
                    relative: 'absolute'
                },
                HeightMixin: {
                    height: 22
                },
            });
        });

        it('should set privates for derived classes', function () {

            expect(this.secretHeight.secret).to.be.equal('quiet');
        });

        it('should format privates in a nice debug string', function () {
            expect(this.secretHeight.toDebugString())
                .to.be.equal('<SecretHeight->Secret->Privacy->:HeightMixin\n' +
                    '{ Secret: { secret: \'quiet\', add: \'value\' },\n  ' +
                    'HeightMixin: { height: 22 } }>');
        });

    });
});
