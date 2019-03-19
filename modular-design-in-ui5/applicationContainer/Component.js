sap.ui.define([
	"com/haojia/test/control/BaseComponent",
	"com/haojia/test/service/HostFacade"
], function (BaseUIComponent, HostFacade) {
	"use strict";
	return BaseUIComponent.extend("com.haojia.test.applicationContainer.Component", {
		metadata: {
			manifest: "json",
			properties: {
				componentManager: {
					type: 'sap.ui.core.Control'
				},
				securityHandler: {
					type: 'sap.ui.core.Control'
				}
			}
		},
		init: function () {
			BaseUIComponent.prototype.init.apply(this, arguments);
			this.setHostFacade(new HostFacade());
			this.getRouter().attachBypassed(null, this._handleRouteBypassed.bind(this));
			this.getRouter().initialize();
			$('body').addClass(this.getContentDensityClass());
		},
		setComponentManager: function (value) {
			this.componentManager = value;
			var hostFacade;
			if (this.getHostFacade()) {
				hostFacade = this.getHostFacade();
			} else {
				hostFacade = new HostFacade();
				this.setHostFacade(hostFacade);
			}
			hostFacade.setComponentManager(value);
		},
		_handleRouteBypassed: function (oEvent) {
			if (!window.location.hash || window.location.hash.length === 0) {
				this.getRouter().navTo('AppShell', {
					module: "student"
				});
			}
		}
	});
});