var Player = require('./views/player');
var game = require('./views/game');
var Coordinates = require('./models/coordinates');

module.exports = Backbone.Router.extend({
    initialize: function (input) {
        this.contentView = null;
        this.mainModel = new Coordinates();
    },
    routes: {
        // url to callback func
        'player': 'newPlayer',
        'game' : 'gameView',
    },

    newPlayer: function () {
        if (this.contentView !== null) {
            this.contentView.el.innerHTML = '';
            this.contentView.undelegateEvents();
        }
        this.contentView = new Player({
        el: $('#player'),
        model: this.mainModel, 
        });
        
        this.contentView.render();
        
    },
    
    gameView: function () {
         if (this.contentView !== null) {
            this.contentView.el.innerHTML = '';
            this.contentView.undelegateEvents();
        }
        this.contentView = new game({
        el: $('#coordinates'),
        model: this.mainModel, 
        });
        
        this.contentView.render();
    },
    
});