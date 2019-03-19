sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";

	return Controller.extend("com.haojia.test.applicationContainer.controller.App", {
		onInit: function () {
			var self = this;
			this.getView().setBusyIndicatorDelay(0);
			sap.ui.getCore().getEventBus().subscribe('appIsBusy', function (channel, oEvent, data) {
				if (data.appIsBusy) {
					self.getView().setBusy(true);
				} else {
					self.getView().setBusy(false);
				}
			}, this);
		}
	});

});