'use strict';

describe('EmptyCell', function () {

    const EmptyCell = require('.').Cell.Empty;

    beforeEach(function () {
        this.cell = new EmptyCell();
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
});