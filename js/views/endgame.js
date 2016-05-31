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
