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
        var stateObj = { foo: "bar" };
        history.pushState(stateObj, "page 2", "?t=3");

        // var myURL = document.location;
        // document.location = myURL + "?a=parameter";


        // $location.uiurl({test: makeid()});

        // $location.path({test: makeid()});
        // $location.search({test: makeid()});
        // var stateObj = {foo: "bar"};
        // history.pushState(stateObj);
        // history.pushState({}, null, '?test='+makeid());

    };

    console.log('Rendered');
}