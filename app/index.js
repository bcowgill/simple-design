module.exports = {
    WorldFactory: require('./World'),
    LocationFactory: require('./Location'),
    Cell: {
        Base: require('./Cell'),
        Empty: require('./EmptyCell'),
        Living: require('./LivingCell')
    }
};
