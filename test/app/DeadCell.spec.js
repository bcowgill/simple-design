'use strict';

describe('DeadCell', function () {

    const DeadCell = require('.').Cell.Dead;

    beforeEach(function () {
        this.cell = new DeadCell();
        this.cell.setStaticDebugFormat({
            colorize: false
        });
    });

    it('a DeadCell is not alive', function () {

        expect(this.cell.isAlive).to.be.false;

    });

    it('abstract isAliveInNextGeneration() is implemented ', function () {

        const self = this;

        expect(function () {
            self.cell.isAliveInNextGeneration();
        }).not.to.throw();
    });

    it('a DeadCell can format its private data nicely', function () {

        expect(this.cell.toDebugString())
            .to.be.equal('<DeadCell->EmptyCell->Cell->Privacy { DeadCell: {},\n  ' +
                'Cell: { location: {} },\n  EmptyCell: {} }>');

    });

    it('a DeadCell has a glyph to show what it looks like', function () {

        expect(this.cell.glyph)
            .to.be.equal('☠');

    });

    it('should provide class name', function () {

        expect(this.cell._className)
            .to.deep.equal('DeadCell');
    });

    it('a DeadCell has correct inheritance information', function () {

        expect(this.cell._inherits())
            .to.be.deep.equal({
            chain: [ 'DeadCell', 'EmptyCell', 'Cell', 'Privacy' ],
            classes: {
                DeadCell: true,
                EmptyCell: true,
                Cell: true,
                Privacy: true
            }
        });
    });

    it('a DeadCell class should provide cloned privates for debugger inspection', function () {

        expect(this.cell._private())
            .to.be.deep.equal({
            Privacy: {},
            DeadCell: {},
            EmptyCell: {},
            Cell: {
                location: {}
            }
        });
    });

});