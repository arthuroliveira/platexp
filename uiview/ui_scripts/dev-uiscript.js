(function (angular) {
    angular.module('dev', [])
        .run(function ($route, $location) {
            console.log('here');

            $scope.$on('$locationChangeSuccess', function (event) {

                // Want to prevent re-loading when going from /dataEntry/1 to some other dataEntry path
                if ($route && $route.current && $route.current.$route.templateUrl.indexOf('dataEntry') > 0) {
                    $route.current = lastRoute; //Does the actual prevention of routing
                }
            });

            $location.uiurl = function () {
                console.log('custom search');
            };
        });

})(angular);
