'use strict';

describe('LivingCell', function () {

    const LivingCell = require('.').Cell.Living;

    beforeEach(function () {
        this.cell = new LivingCell();
        this.cell.setStaticDebugFormat({
            colorize: false
        });
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

    it('a LivingCell can format its private data nicely', function () {

        expect(this.cell.toDebugString())
            .to.be.equal('LivingCell { location: Location {} } isa Privacy {} ' +
                'isa Cell { location: Location {} } isa Privacy {}');

    });

    it('a LivingCell has a glyph to show what it looks like', function () {

        expect(this.cell.glyph)
            .to.be.equal('☻');

    });

    it('should provide class name', function () {

        expect(this.cell._className)
            .to.deep.equal('LivingCell');
    });

    it('a LivingCell has correct inheritance information', function () {

        expect(this.cell._inherits())
            .to.be.deep.equal({
            chain: [ 'LivingCell', 'Cell', 'Privacy' ],
            classes: {
                LivingCell: true,
                Cell: true,
                Privacy: true
            }
        });
    });

});