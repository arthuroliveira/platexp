function ($location) {
    var c = this;

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    c.test = function () {
        // $location.search({test: makeid()});
        // var stateObj = {foo: "bar"};
        // history.pushState(stateObj);
        history.pushState({}, null, '?test='+makeid());

    };

    console.log('Rendered');
}