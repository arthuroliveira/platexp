function (nowtification, $rootScope, $scope, $timeout, spUtil) {
    /* widget controller */
    var c = this;

    $rootScope.$on('showNotification', function () {
        c.notifications = nowtification.getNotifications();
    });
    var timeoutPromise;

    c.notifications = [];

    function init() {
        nowtification.getNotifications().forEach(function (item) {
            c.notifications.push(item);
            if (timeoutPromise)
                $timeout.cancel(timeoutPromise);
            timeoutPromise = $timeout(function () {
                c.notifications = [];
            }, 3000);
        });
    }

    // nowtification.setOnShowNotification(init);
    init();

    c.collapse = function (notification_index) {
        c.notifications.splice(notification_index, 1)
    };

    if (c.options.table) {
        spUtil.recordWatch($scope, c.options.table, c.options.tableFilter || "");
    }
}
