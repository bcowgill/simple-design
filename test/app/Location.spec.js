'use strict';

describe('Location', function () {

    const LocationFactory = require('.').LocationFactory;

    before(function () {
        (LocationFactory.origin()).setStaticDebugFormat({
            colorize: false
        });
    });

    describe('LocationFactory', function () {

        it('should be able to create a Location at the origin', function () {

            const location = LocationFactory.origin();

            expect(location.toString()).to.be.equal('(0, 0)');

        });

        it('should be able to create a Location at a specific position', function () {

            const location = LocationFactory.at(2,3);

            expect(location.toString()).to.be.equal('(2, 3)');

        });

        it('should be able to create a random Location which changes', function () {
            /* jshint maxcomplexity: 2 */
            const location = LocationFactory.random();
            var different = false;

            [1, 2, 3, 4, 5].forEach(function () {
                const random = LocationFactory.random(1000);

                random.ifSameAs(location, null, function () {
                    different = true;
                });
            });

            expect(different).to.be.true;

        });

        it.skip('should limit the range of values of a random location', function () {
            /* jshint maxcomplexity: 4 */
            const range = 15;
            var max = -1,
                min = range + 1;

            for (var count = 5000; count > 0; count -= 1) {
                const random = LocationFactory.random(range);
                max = Math.max(max, random.x, random.y);
                min = Math.min(min, random.x, random.y);
            }

            expect(min).to.be.equal(0);
            expect(max).to.be.equal(range);

        });

    });

    describe('Location instance', function () {

        it('should be able to compare locations to see if they are the same', function () {

            const location = LocationFactory.at(2, 5),
                location2 = LocationFactory.at(2, 5);
            var same = false;

            location.ifSameAs(location2, function () {
                same = true;
            });

            expect(same).to.be.true;

        });

        it('should be able to compare locations to see if they are different', function () {

            const location = LocationFactory.origin(),
                location2 = LocationFactory.at(1, 1);
            var different = false;

            location.ifSameAs(location2, null, function () {
                different = true;
            });

            expect(different).to.be.true;

        });

        it('should have 8 neighbor locations', function () {

            const location = LocationFactory.origin(),
                neighbors = location.getNeighbors(),
                expected = [
                    '(-1, -1)',
                    '(-1, 0)',
                    '(-1, 1)',
                    '(0, -1)',
                    '(0, 1)',
                    '(1, -1)',
                    '(1, 0)',
                    '(1, 1)'
                ];

            expect(neighbors.length).to.be.equal(8);
            neighbors.forEach(function (location, idx) {
                expect(location.toString()).to.be.equal(expected[idx]);
            });

        });

        describe('debugging', function () {

            it('should be able to show the location as a simple string', function () {

                const location = LocationFactory.at(2, 5);

                expect(location.toString()).to.be.equal('(2, 5)');

            });

            it('should provide class name', function () {

                const location = LocationFactory.origin();

                expect(location._className)
                    .to.deep.equal('Location');
            });

            it('should be able to convert a location to a debug string', function () {

                const location = LocationFactory.origin();

                expect(location.toDebugString())
                    .to.be.equal('<Location->Privacy\n{ Location: { x: 0, y: 0 } }>');

            });

            it('a Location has correct inheritance information', function () {

                const location = LocationFactory.origin();

                expect(location._inherits())
                    .to.be.deep.equal({
                    chain: [ 'Location', 'Privacy' ],
                    classes: {
                        Location: true,
                        Privacy: true
                    }
                });
            });

        });
    });
});