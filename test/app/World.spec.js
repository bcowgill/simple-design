'use strict';

describe('World', function () {

    const WorldFactory = require('.').WorldFactory;

    function testDouble (name) {
        const double = { testDoubleName: name };
        double.isSame = sinon.stub().returns(true);
        return double;
    }

    beforeEach(function () {
        this.world = WorldFactory.createEmpty();
        this.world.setStaticDebugFormat({
            colorize: false
        });
    });

    it('a new world should be empty', function () {

        expect(this.world.isEmpty).to.be.true;

    });

    it('an empty world should remain empty after a tick', function () {

        const newWorld = this.world.tick();
        expect(newWorld.isEmpty).to.be.true;

    });

    it('should be able to add a living cell to the World', function () {

        const location = testDouble('some location');

        this.world.setLivingAt(location);

        expect(this.world.isAliveAt(location)).to.be.true;

    });

    it('should NOT be empty after adding a living cell to a new World', function () {

        const location = testDouble('some location');

        this.world.setLivingAt(location);

        expect(this.world.isEmpty).to.be.false;

    });

    it('should be able to convert a world to a debug string', function () {

        expect(this.world.toDebugString())
            .to.be.equal('<World->Privacy { World: { cells: [ [length]: 0 ] } }>');

    });

    it('should provide class name', function () {

        expect(this.world._className)
            .to.deep.equal('World');
    });

    it('a World has correct inheritance information', function () {

        expect(this.world._inherits())
            .to.be.deep.equal({
            chain: [ 'World', 'Privacy' ],
            classes: {
                World: true,
                Privacy: true
            }
        });
    });

    it('a World class should provide cloned privates for debugger inspection', function () {

        expect(this.world._private())
            .to.be.deep.equal({
            Privacy: {},
            World: {
                cells: []
            }
        });
    });

});
