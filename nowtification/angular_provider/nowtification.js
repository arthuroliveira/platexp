function($cookies) {
    var onShowNotification;

    var addNotification = function(type, text, title) {
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

        $cookies.put('notifications', JSON.stringify(notifications), { path: '/' });
    };
    return {
        getNotifications: function() {
            var response = $cookies.get('notifications');
            if (response)
                response = JSON.parse(response);
            else
                response = [];
            $cookies.remove('notifications');
            return response;
        },

        addSuccess: function(text, title) {
            addNotification('success', text, title);
        },

        addError: function(text, title) {
            addNotification('danger', text, title);
        },

        addInfo: function(text, title) {
            addNotification('info', text, title);
        },

        addAlert: function(text, title) {
            addNotification('warning', text, title);
        }

    }

}
