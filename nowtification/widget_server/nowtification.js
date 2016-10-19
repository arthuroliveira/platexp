(function() {

  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  	return;
    var myuserid = gs.getUserID();
    var myuser = gs.getUser();
    var mygroups = gs.getUser().getMyGroups().toArray().join(',');
    var query = "u_incident.u_business_service.u_l2_support_groupIN"+mygroups+"^ORu_incident.u_business_service.u_support_infraIN"+mygroups+"^ORu_usersLIKE"+myuserid;

	var notificationRead = myuser.getPreference('sevNotificationRead') || "null";


	var gr = new GlideRecord("u_severity_incident_management_notification");
    gr.addQuery('u_type', 'push');
    gr.addEncodedQuery(query);
    gr.query();
	var notificationsToDisplay = [];
	var n;
	while(gr.next()) {
		n = {};
		n.message = gr.getValue('u_message');
		notificationsToDisplay.push(n);
	}

	data.notifications = notificationsToDisplay;
})();