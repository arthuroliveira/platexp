(function (angular) {

    angular.module('platexp', [])
        .factory('widgetsFactory', [function () {
            var reusableWidgets = {};
            return {
                getReusableWidget: function (id) {
                    return reusableWidgets[id];
                },
                addReusableWidgets: function (id, response) {
                    reusableWidgets[id] = response;
                },
            };
        }])
        .directive('includeWidget', function (spUtil, widgetsFactory) {
            return {
                restrict: 'E',
                scope: {
                    id: '@',
                    refresh: '@?',
                    parameters: '=?'
                },
                template: function (elem, attr) {
                    return '<sp-widget widget="widget"></sp-widget>';
                },
                controller: function ($scope) {
                    var reusableWidget = widgetsFactory.getReusableWidget($scope.id);
                    if (reusableWidget && !$scope.refresh) {
                        $scope.widget = reusableWidget;
                    } else {
                        var parameter = $scope.parameters || {};
                        spUtil.get($scope.id, {parameters: parameter}).then(function (response) {
                            if (!$scope.refresh) {
                                widgetsFactory.addReusableWidgets($scope.id, response);
                            }
                            $scope.widget = response

                        });
                    }

                }
            };
        })
        .directive('includeWidgetAutoRefresh', function ($compile) {
            var getTemplate = function (scope) {
                if (scope.id) {
                    return "<include-widget id='" + scope.id + "' parameters='parameters' refresh='refresh'></include-widget>";
                } else {
                    return "<span>Opps, No Content</span>";
                }
            };
            return {
                restrict: 'E',
                scope: {
                    id: '=?',
                    refresh: '@?',
                    parameters: '=?'
                },
                // template: function (elem, attr) {
                //     return '<sp-widget widget="widget"></sp-widget>';
                // },
                link: function (scope, element, attrs) {
                    scope.$watch('id', function (value) {
                        element.html(getTemplate(scope)).show();
                        $compile(element.contents())(scope);
                    });
                }

            };
        })
        .directive('compile', function ($compile) {
            return function (scope, element, attrs) {
                scope.$watch(
                    function (scope) {
                        // watch the 'compile' expression for changes
                        return scope.$eval(attrs.compile);
                    },
                    function (value) {
                        // when the 'compile' expression changes
                        // assign it into the current DOM
                        element.html(value);

                        // compile the new DOM and link it to the current
                        // scope.
                        // NOTE: we only compile .childNodes so that
                        // we don't get into infinite loop compiling ourselves
                        $compile(element.contents())(scope);
                    }
                );
            }
        })
        .factory('appManager', function ($rootScope) {
            return {
                setTitle: function (title) {
                    $rootScope.title = title;
                    window.snmCabrillo.viewLayout.setTitle(title);
                }
            }
        })
        .factory('sharedObj', function () {
            var obj = {};

            return {
                _get: function (key) {
                    return obj[key];
                },
                _set: function (key, value) {
                    obj[key] = value;
                }

            }
        })

})(angular);
