'use strict';

describe('Cell', function () {

    const Cell = require('.').Cell.Base;

    beforeEach(function () {
        this.cell = new Cell();
        this.cell.setStaticDebugFormat({
            colorize: false
        });
    });

    it('a cell is not alive by default', function () {

        expect(this.cell.isAlive).to.be.false;

    });

    it('a cell has an abstract method isAliveInNextGeneration() ' +
        'which throws a ReferenceError if called', function () {

        const self = this;

        expect(function () {
            self.cell.isAliveInNextGeneration();
        }).to.throw(ReferenceError);

        expect(function () {
            self.cell.isAliveInNextGeneration();
        }).to.throw('Abstract method invocation. Should be implemented by a derived class.');

    });

    it('a cell has an abstract property glyph ' +
        'which throws a ReferenceError if called', function () {

        const self = this;

        expect(function () {
            self.cell.glyph;
        }).to.throw(ReferenceError);

        expect(function () {
            self.cell.glyph;
        }).to.throw('Abstract method invocation. Should be implemented by a derived class.');
    });

    it('should provide class name', function () {

        expect(this.cell._className)
            .to.deep.equal('Cell');
    });

    it('a cell can format its private data nicely', function () {

        expect(this.cell.toDebugString())
            .to.be.equal('<Cell->Privacy { Cell: { location: {} } }>');

    });

    it('a cell has correct inheritance information', function () {

        expect(this.cell._inherits())
            .to.be.deep.equal({
            chain: [ 'Cell', 'Privacy' ],
            classes: {
                Cell: true,
                Privacy: true
            }
        });
    });

    it('a cell class should provide cloned privates for debugger inspection', function () {

        expect(this.cell._private())
            .to.be.deep.equal({
            Privacy: {},
            Cell: {
                location: {}
            }
        });
    });

});