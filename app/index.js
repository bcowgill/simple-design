module.exports = {
    Privacy: require('./Privacy'),
    WorldFactory: require('./World'),
    LocationFactory: require('./Location'),
    Cell: {
        Base: require('./Cell'),
        Empty: require('./EmptyCell'),
        Dead: require('./DeadCell'),
        Living: require('./LivingCell')
    }
};
