sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("com.haojia.test.applicationContainer.controller.App", {
		onInit: function() {
			var self = this;
			this.getView().setBusyIndicatorDelay(0);
			sap.ui.getCore().getEventBus().subscribe('appIsBusy', function(channel, oEvent, data) {
				if (data.appIsBusy) {
					self.getView().setBusy(true);
				} else {
					self.getView().setBusy(false);
				}
			}, this);
			sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(function(oEvent) {
				var module = oEvent.getParameter('arguments').module;
				if (module) {
					self.byId('applicationComponentLoader').showComponent({
						name: module
					});
				}
			});
		},
		getComponent: function() {
			return sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));
		},
		studentList: function() {
			this.getComponentHelper().navTo('student', {
				name: 'StudentList'
			});
		},
		examList: function() {
			this.getComponentHelper().navTo('exam', {
				name: 'ExamList'
			});
		},
		getComponentHelper: function() {
			return this.byId('applicationComponentLoader');
		}
	});

});