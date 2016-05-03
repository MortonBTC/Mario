 
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
        }
    },
    
    left: function () {
        if (this.model.get("xCoordinate") > 0) {
            var x = this.model.get("xCoordinate");
            x--;
            this.model.set("xCoordinate", x);
        }
    },
    
    down: function () {
        if (this.model.get("yCoordinate") > 0) {
            var y = this.model.get("yCoordinate");
            y--;
            this.model.set("yCoordinate", y);
        }
    },
    
    right: function () {
        if (this.model.get("xCoordinate") < 11) {
            var x = this.model.get("xCoordinate");
            x++;
            this.model.set("xCoordinate", x);
        }
    },

})