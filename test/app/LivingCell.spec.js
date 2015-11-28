'use strict';

describe('LivingCell', function () {

    const LivingCell = require('.').Cell.Living;

    beforeEach(function () {
        this.cell = new LivingCell();
    });

    it('a LivingCell is alive', function () {

        expect(this.cell.isAlive).to.be.true;

    });

    it('abstract isAliveInNextGeneration() is implemented ', function () {

        const self = this;

        expect(function () {
            self.cell.isAliveInNextGeneration();
        }).not.to.throw();
    });
});