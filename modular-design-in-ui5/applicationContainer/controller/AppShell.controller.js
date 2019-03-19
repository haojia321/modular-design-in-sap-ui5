sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";

	return Controller.extend("com.haojia.test.applicationContainer.controller.AppShell", {
		onInit: function () {
			var self = this;
			this.componentManager = this.byId('applicationComponentLoader');
			this.getOwnerComponent().setComponentManager(this.componentManager);
			sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(function (oEvent) {
				var module = oEvent.getParameter('arguments').module;
				if (module) {
					self.byId('applicationComponentLoader').showComponent({
						name: module
					});
				}
			});
		},
		getComponent: function () {
			return sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));
		},
		studentMain: function () {
			this.getComponent().getHostFacade().navTo({
				name: 'student'
			});
		},
		studentList: function () {
			this.getComponent().getHostFacade().navTo({
				name: 'student'
			}, {
				name: 'StudentList'
			});
		},
		examList: function () {
			this.getComponent().getHostFacade().navTo({
				name: 'exam'
			}, {
				name: 'ExamList'
			});
		}
	});
});