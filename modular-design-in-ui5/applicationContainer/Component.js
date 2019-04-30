sap.ui.define([
	"com/haojia/test/control/BaseComponent"
], function (BaseUIComponent) {
	"use strict";
	return BaseUIComponent.extend("com.haojia.test.applicationContainer.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			BaseUIComponent.prototype.init.apply(this, arguments);

			var oRouter = this.getRouter();

			oRouter.attachRouteMatched(this.hideBusyState.bind(this));
			this.getRootControl().setBusyIndicatorDelay(0);
			this.showBusyState();

			this.getRouter().initialize();

			$('body').addClass(this.getContentDensityClass());

		},
		showBusyState: function() {
			this.getRootControl().setBusy(true);
		},
		hideBusyState: function() {
			this.getRootControl().setBusy(false);
		}
	});
});
