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