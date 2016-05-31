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
        title.textContent = this.model.get("name");
        this.el.textContent = this.model.get("name") + " driving: " + this.model.get("car");
    }
    
});
