function () {
    return {
        template: '<div>' +
        '<div class="map" style=\'height: {{ height || "400px" }}; width: {{ width || "100%" }};\'>MAP</div>' +
        '<div ng-bind-html="c.scriptInclude"></div>' +
        '</div>',
        restrict: 'E',
        replace: true,
        controllerAs: "c",
        scope: {
            key: "@",
            height: "@?",
            width: "@?",
            center: "=?",
            zoom: "@?",
            locations: "=?"
        },
        controller: function ($scope, $sce) {
            var c = this;
            c.init = function (element) {
                var map = new google.maps.Map(element.children()[0], {
                    center: $scope.center || {lat: 37.09024, lng: -95.712891},
                    zoom: $scope.zoom || 3
                });
                if ($scope.locations) {
                    $scope.locations.forEach(function (item) {
                        item.map = map;
                        var marker = new google.maps.Marker(item);
                    });
                }


            };

            var url = "https://maps.googleapis.com/maps/api/js?key=" + $scope.key + "&callback=initMap";
            c.scriptInclude = $sce.trustAsHtml("<script src='" + url + "' async defer></script>");

        },
        link: function link(scope, element, attrs, controller) {
            window.initMap = function () {
                controller.init(element);
            }
        }
    };
}
