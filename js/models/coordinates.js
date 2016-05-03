module.exports = Backbone.Model.extend({
    defaults: {
        name: 'Player',
        car: null,
        gas: 100,
        xCoordinate: 0,
        yCoordinate: 0,
        tesla: {
            intgas: 50,
            gas: 1,
            },
        porsche: {
            intgas: 0,
            gas: 5
            }
    },
    
});