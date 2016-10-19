(function () {

    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    var myuserid = gs.getUserID();
    var mygroups = gs.getUser().getMyGroups().toArray().join(',');


    if (options.table && options.query) {
        options.query.replace('$myuserid', myuserid);
        options.query.replace('$mygroups', mygroups);

        var gr = new GlideRecord(options.table);
        gr.addEncodedQuery(options.query);
        gr.query();
        var notificationsToDisplay = [];
        var n;
        while (gr.next()) {
            n = {};
            $sp.getRecordDisplayValues(n, gr, options.fields);
            notificationsToDisplay.push(n);
        }

        data.notifications = notificationsToDisplay;
    }

})();