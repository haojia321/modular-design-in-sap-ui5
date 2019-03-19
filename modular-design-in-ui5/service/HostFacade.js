sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	return Control.extend("com.haojia.test.service.HostFacade", {
		metadata: {
			properties: {
				componentManager: {
					type: 'sap.ui.core.Control'
				}
			}
		},
		setBusy: function (isBusy) {
			sap.ui.getCore().getEventBus().publish('appIsBusy', {
				appIsBusy: isBusy
			});
		},
		navTo: function (componentSettings, navToObj) { //{name: '', parameters: '', replace: ''}
			this.getComponentManager().navTo(componentSettings, navToObj);
		}
	});
}, true);