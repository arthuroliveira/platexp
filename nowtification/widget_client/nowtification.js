function (nowtificationFactory, $rootScope, $scope, $timeout, spUtil) {
    /* widget controller */
    var c = this;

    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
    //     if (fromState.name != toState.name)
    //         c.notifications = nowtificationFactory.getNotifications();
    // });

    $rootScope.$on('showNotification', function () {
        c.notifications = nowtificationFactory.getNotifications();
    });
    var timeoutPromise;

    c.notifications = [];

    function init() {
        nowtificationFactory.getNotifications().forEach(function (item) {
            c.notifications.push(item);
            if (timeoutPromise)
                $timeout.cancel(timeoutPromise);
            timeoutPromise = $timeout(function () {
                c.notifications = [];
            }, 3000);
        });
    }

    nowtificationFactory.setOnShowNotification(init);


    init();

    c.collapse = function (notification_index) {
        c.notifications.splice(notification_index, 1)
    };

    if (c.options.table) {
        spUtil.recordWatch($scope, c.options.table, "");
    }
}
