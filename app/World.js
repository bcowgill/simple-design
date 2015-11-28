'use strict';

const category = 'World',
    Privacy = require('./Privacy'),
    LivingCell = require('./LivingCell'),
    _ = require('underscore'),
    privates = new WeakMap();

var _getCellAt;

class World extends Privacy
{
    constructor () {
        super();
        privates.set(this, {
            cells: []
        });
    }

    get isEmpty () {
        return privates.get(this).cells.length === 0;
    }

    setLivingAt (location) {
        var cells, cell = _getCellAt.call(this, location);

        if (cell) {
            if (!cell.isAlive) {
                cell = new LivingCell(location);
            }
        }
        else {
            cells = privates.get(this).cells;
            cells.push(new LivingCell(location));
        }
        return this;
    }

    isAliveAt (location) {
        const cell = _getCellAt.call(this, location),
            alive = cell ? cell.isAlive : false;

        return alive;
    }

    tick () {
        return this;
    }

    /** @override */
    toDebugString (into, derivedPrivates, derivedClassName) {
        return super.toDebugString(into, derivedPrivates || privates,
            derivedClassName || category);
    }

    /** @override */
    _inherits (into) {
        into = super._inherits(into);
        into.chain.unshift(category);
        into.classes[category] = true;
        return into;
    }

    /** @override */
    _private (into, derivedPrivates, derivedClassName) {
        into = super._private(into, derivedPrivates || privates, derivedClassName || category);
        return super._private(into);
    }
}

_getCellAt = function (location) {
    const cells = privates.get(this).cells,
        cell = _.find(cells, function isAt (cell) {
            return location.isSame(cell.location);
        });
    return cell;
};

class WorldFactory {
    createEmpty () {
        return new World();
    }
}

module.exports = new WorldFactory();
