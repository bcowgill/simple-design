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
            .to.be.equal('<EmptyCell->Cell->Privacy { EmptyCell: {}, ' +
                'Cell: { location: {} } }>');

    });

    it('an EmptyCell has a glyph to show what it looks like', function () {

        expect(this.cell.glyph)
            .to.be.equal('␠');

    });

    it('should provide class name', function () {

        expect(this.cell._className)
            .to.deep.equal('EmptyCell');
    });

    it('an EmptyCell has correct inheritance information', function () {

        expect(this.cell._inherits())
            .to.be.deep.equal({
            chain: [ 'EmptyCell', 'Cell', 'Privacy' ],
            classes: {
                EmptyCell: true,
                Cell: true,
                Privacy: true
            }
        });
    });

    it('a EmptyCell class should provide cloned privates for debugger inspection', function () {

        expect(this.cell._private())
            .to.be.deep.equal({
            Privacy: {},
            EmptyCell: {},
            Cell: {
                location: {}
            }
        });
    });

});