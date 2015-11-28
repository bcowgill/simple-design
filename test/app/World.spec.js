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
});
