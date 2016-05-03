(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.addEventListener('load', function () {
    var Router = require('./router');

    var router = new Router();
    Backbone.history.start();
    
});
},{"./router":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"./models/coordinates":2,"./views/game":4,"./views/player":5}],4:[function(require,module,exports){
 
module.exports = Backbone.View.extend({
    initialize: function () {
        
        this.model.on('change', this.render, this)
    },
    
    template: _.template(document.getElementById('control').textContent),
    
    events: {
        'click #upButton': 'up', 
        'click #leftButton': 'left',
        'click #downButton': 'down',
        'click #rightButton': 'right',
    },
    
    render: function () {
        this.el.innerHTML = this.template({
            person: this.model.get("name"),
            personCar: this.model.get("car"),
            x: this.model.get("xCoordinate"),
            y: this.model.get("yCoordinate"),
            gas: this.model.get("gas")
        });
        var x = document.getElementById('x');
        x.textContent = this.model.get("xCoordinate");
        var y = document.getElementById('y');
        y.textContent = this.model.get("yCoordinate");
        var z = document.getElementById('gas');
        z.textContent = this.model.get("gas");
    },
    
    up: function () {
        if (this.model.get("yCoordinate") < 11) {
            var y = this.model.get("yCoordinate");
            y++;
            this.model.set("yCoordinate", y);
 //           if (this.model.get("car")==="a")
            this.render();
        }
    },
    
    left: function () {
        if (this.model.get("xCoordinate") > 0) {
            var x = this.model.get("xCoordinate");
            x--;
            this.model.set("xCoordinate", x);
            
            this.render();
        }
    },
    
    down: function () {
        if (this.model.get("yCoordinate") > 0) {
            var y = this.model.get("yCoordinate");
            y--;
            this.model.set("yCoordinate", y);
            
            this.render();
        }
    },
    
    right: function () {
        if (this.model.get("xCoordinate") < 11) {
            var x = this.model.get("xCoordinate");
            x++;
            this.model.set("xCoordinate", x);
            
            this.render();
        }
    },

})
},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({
    events: {
       'click #newP': 'newPlayer',
    },
    
    template: _.template(document.getElementById('playerInfo').textContent),
    
    render: function () {
        this.el.innerHTML = this.template();
    },

    newPlayer: function () {

        this.model.set("name", document.getElementById("createPlayer").value);
        var car = "no car";
        var car1 = document.getElementById('car1');
        var car2 = document.getElementById('car2');
         if (car1.checked) {
             car = car1.value;
            this.model.set("gas", this.model.get("gas")-this.model.get("intgas"));
         }
        if (car2.checked) {
             car = car2.value;
            this.model.set("gas", this.model.get("gas")-this.model.get("intgas"));
         }
        this.model.set("car", car);
        this.el.innerHTML = '';
        var title = document.getElementById('playTitle');
        title.textContent = this.model.get("name");
        this.el.textContent = this.model.get("name") + " driving: " + this.model.get("car");
    }
    
});

},{}]},{},[1])