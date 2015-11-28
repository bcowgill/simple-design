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

    it('a cell can format its private data nicely', function () {

        expect(this.cell.toDebugString())
            .to.be.equal('Cell { location: Location {} } isa Privacy {}');

    });

});