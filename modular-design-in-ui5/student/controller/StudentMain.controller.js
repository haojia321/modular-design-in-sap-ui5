sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.haojia.test.student.controller.StudentMain", {
		onInit: function () {
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("StudentMain").attachPatternMatched(this.onRoutePatternMatched, this);
		},
		onRoutePatternMatched: function (e) {
			this.getOwnerComponent().getRouter().navTo('StudentList', null, true);
		}
	});
});