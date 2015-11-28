'use strict';

const category = 'World',
    LivingCell = require('./LivingCell'),
    _ = require('underscore'),
    privates = new WeakMap();

var _getCellAt,
    _setPrivate;

class World
{
    constructor () {
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

    toDebugString () {
        const util = require('util'),
            SHOW_HIDDEN = true,
            INFINITE_DEPTH = null,
            COLORIZE = true;
        return category + ' ' + util.inspect(privates.get(this),
                SHOW_HIDDEN, INFINITE_DEPTH, COLORIZE);
    }
}

_getCellAt = function (location) {
    const cells = privates.get(this).cells,
        cell = _.find(cells, function isAt (cell) {
            return location.isSame(cell.location);
        });
    return cell;
};

_setPrivate = function (key, value) {
    const _privates = privates.get(this);
    _privates[key] = value;
    return this;
};

class WorldFactory {
    createEmpty () {
        return new World();
    }
}

module.exports = new WorldFactory();
