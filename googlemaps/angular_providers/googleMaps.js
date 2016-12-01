function () {
    return {
        template: '<div class="map">MAP</div>',
        restrict: 'E',
        replace: true,
        scope: {
            key: "@"
        },
        controller: function ($scope) {
        },
        link: function link(scope, element, attrs, controller) {

        }
    };
}
