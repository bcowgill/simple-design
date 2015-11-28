'use strict';

describe('EmptyCell', function () {

    const EmptyCell = require('.').Cell.Empty;

    beforeEach(function () {
        this.cell = new EmptyCell();
        this.cell.setStaticDebugFormat({
            colorize: false
        });
    });

    it('an EmptyCell is not alive', function () {

        expect(this.cell.isAlive).to.be.false;

    });

    it('abstract isAliveInNextGeneration() is implemented ', function () {

        const self = this;

        expect(function () {
            self.cell.isAliveInNextGeneration();
        }).not.to.throw();
    });

    it('an EmptyCell can format its private data nicely', function () {

        expect(this.cell.toDebugString())
            .to.be.equal('EmptyCell { location: Location {} } isa Privacy {} ' +
            'isa Cell { location: Location {} } isa Privacy {}');

    });
});