module.exports = Backbone.Model.extend({
    defaults: {
        name: 'Player',
        car: null,
        gas: 100,
        xCoordinate: Math.round(Math.random() * 9),
        yCoordinate: Math.round(Math.random() * 9),
        xPod: Math.round(Math.random() * 9),
        yPod: Math.round(Math.random() * 9),
        tesla: {
            intgas: 50,
            gas: 3,
            },
        porsche: {
            intgas: 100,
            gas: 5
            }
    },
});