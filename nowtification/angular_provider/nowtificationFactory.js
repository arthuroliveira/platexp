function ($cookies) {
    var onShowNotification;

    var addNotification = function (type, text, title, skip) {
        var notifications = $cookies.get('notifications');
        if (!notifications) {
            notifications = [];
        } else {
            notifications = JSON.parse(notifications);
        }

        notifications.push({
            type: type,
            text: text,
            title: title
        });

        $cookies.put('notifications', JSON.stringify(notifications), {path: '/'});

        if (onShowNotification && !skip) {
            onShowNotification();
        }

    };
    return {
        getNotifications: function () {
            var response = $cookies.get('notifications');
            if (response)
                response = JSON.parse(response);
            else
                response = [];
            $cookies.remove('notifications');
            return response;
        },

        setOnShowNotification: function (callback) {
            onShowNotification = callback;
        },
        addSuccess: function (text, title, skip) {
            addNotification('success', text, title, skip);
        },

        addError: function (text, title, skip) {
            addNotification('danger', text, title, skip);
        },

        addInfo: function (text, title) {
            addNotification('info', text, title);
        },

        addAlert: function (text, title) {
            addNotification('warning', text, title);
        }

    }

}
