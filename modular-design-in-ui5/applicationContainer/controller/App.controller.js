sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/HashChanger",
	"sap/ui/core/Component"
], function(Controller, UIComponent, HashChanger, Component) {
	"use strict";

	return Controller.extend("com.haojia.test.applicationContainer.controller.App", {
		onInit: function () {
			this.oRouter = UIComponent.getRouterFor(this);
			this.oOwnerComponent = Component.getOwnerComponentFor(this.getView());
		},
		studentMain: function () {
			this.oOwnerComponent.showBusyState();
			this.oRouter.navTo("student");
		},
		studentList: function () {
			this.oOwnerComponent.showBusyState();
			var oGlobalHashChanger = HashChanger.getInstance();
			setTimeout(function() {
				oGlobalHashChanger.setHash("student&/student-prefix/list");
			}, 0);
		},
		examList: function () {
			this.oOwnerComponent.showBusyState();
			var oGlobalHashChanger = HashChanger.getInstance();
			setTimeout(function() {
				oGlobalHashChanger.setHash("exam&/exam-prefix/list");
			}, 0);
		}
	});

});
