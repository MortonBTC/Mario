window.addEventListener('load', function () {
    var Router = require('./router');

    var router = new Router();
    Backbone.history.start();
    
});