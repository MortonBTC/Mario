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
},{}],3:[function(require,module,exports){
var Player = require('./views/player');
var game = require('./views/game');
var Coordinates = require('./models/coordinates');
var endGame = require('./views/endgame');

module.exports = Backbone.Router.extend({
    initialize: function (input) {
        this.contentView = null;
        this.mainModel = new Coordinates();
    },
    routes: {
        // url to callback func
        'player': 'newPlayer',
        'game' : 'gameView',
        'gameover' : 'gameOver',
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
    
    gameOver: function () {
         if (this.contentView !== null) {
            this.contentView.el.innerHTML = '';
            this.contentView.undelegateEvents();
        }
        this.contentView = new endGame({
        el: $('#coordinates'),
        });
        
        this.contentView.render();
    },
    
});
},{"./models/coordinates":2,"./views/endgame":4,"./views/game":5,"./views/player":6}],4:[function(require,module,exports){
module.exports = Backbone.View.extend({

    events: {
       'click #newGame': 'newGame',
    },
    
    template: _.template(document.getElementById('gameOver').textContent),
    
    render: function () {
        this.el.innerHTML = this.template();
    },
    
    newGame: function () {
        location.href = "#/player";
    }
    
});

},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({
    initialize: function () {
           var grid = document.getElementById('cell-grid');
              for (var y = 0; y < 10; y++) {
                for (var x = 0; x < 10; x++) {
              var div = document.createElement('div');
              div.setAttribute('id', 'cell-' + x + '-' + y);
              div.classList.add('cells');
              
              // is the current cell an energy pod?
              if (x === this.model.get('xPod') && y === this.model.get('yPod')) {
                div.classList.add('energy-pod');
              }
              if (x === this.model.get('xCoordinate') && y === this.model.get('yCoordinate')) {
                div.classList.add('movement');
              }
              grid.appendChild(div);
          }
        }
        
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
    },
    
    gas: function () {
        if (this.model.get("gas") > 0) {
        var carObj = this.model.get(this.model.get("car").substring(2).toLowerCase());
        var rungas = carObj.gas;
        var totalGas = this.model.get("gas") - rungas;
        this.model.set("gas", totalGas);
        } else {
            location.href = "#/gameover";
        }
        if (this.model.get("xCoordinate") === this.model.get("xPod") && this.model.get("yCoordinate") === this.model.get("yPod")) {
        var removePod = document.getElementById('cell-' + this.model.get('xPod') + '-' + this.model.get('yPod'))
         removePod.classList.remove('energy-pod');
        removePod.classList.add('movement');
            var random1 = Math.floor(Math.random() * 9);
            var random2 = Math.floor(Math.random() * 9);
        this.model.set('xPod', random1);
        this.model.set('yPod', random2);
        var addPod = document.getElementById('cell-' + random1 + '-' + random2)
         addPod.classList.add('energy-pod');
        if (this.model.get('gas') <= 80) {
            this.model.set('gas', this.model.get('gas') + 25);
        } else if (this.get('gas') <= 90) {
            this.model.set('gas', this.model.get('gas') + 10);
        } else {
            this.model.set('gas', this.model.get('gas') + 5);
        }
        }
    },
    
    removeTile: function () {
        var tile0 = document.getElementById('cell-' + this.model.get('xCoordinate') + '-' + this.model.get('yCoordinate'))
         tile0.classList.remove('movement');
    },
    
    changeTile: function () {
        var tile1 = document.getElementById('cell-' + this.model.get('xCoordinate') + '-' + this.model.get('yCoordinate'))
         tile1.classList.add('movement');
    },
    
    down: function () {
        if (this.model.get("yCoordinate") < 9) {
            this.removeTile();
            var y = this.model.get("yCoordinate");
            y++;
            this.model.set("yCoordinate", y);
            this.gas();
            this.changeTile();
        }
    },
    
    left: function () {
        if (this.model.get("xCoordinate") > 0) {
            this.removeTile();
            var x = this.model.get("xCoordinate");
            x--;
            this.model.set("xCoordinate", x);
            this.gas();
            this.changeTile();
        }
    },
    
    up: function () {
        if (this.model.get("yCoordinate") > 0) {
            this.removeTile();
            var y = this.model.get("yCoordinate");
            y--;
            this.model.set("yCoordinate", y);
            this.gas();
            this.changeTile();
        }
    },
    
    right: function () {
        if (this.model.get("xCoordinate") < 9) {
            this.removeTile();
            var x = this.model.get("xCoordinate");
            x++;
            this.model.set("xCoordinate", x);
            this.gas();
            this.changeTile();
        }
    },
});
},{}],6:[function(require,module,exports){
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
         }
        if (car2.checked) {
             car = car2.value;
         }
        this.model.set("car", car);
        var carSel = this.model.get("car").substring(2).toLowerCase();
        var carObj = this.model.get(carSel);
        var startgas = carObj.intgas;
        this.model.set("gas", startgas);
        this.el.innerHTML = '';
        var title = document.getElementById('playTitle');
        title.textContent = this.model.get("name")+"'s ";
        this.el.textContent = this.model.get("name") + " driving: " + this.model.get("car");
    }
    
});

},{}]},{},[1])