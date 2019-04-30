sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
	"use strict";
	return UIComponent.extend("sap.sf.learning.ui.control.BaseUIComponent", {
		metadata: {
			properties: {
				hostFacade: {
					type: 'sap.ui.core.Control'
				}
			}
		},
		init: function () {
			if (this.getComponentData() && this.getComponentData().hostFacade) {
				this.setHostFacade(this.getComponentData().hostFacade);
			}
			UIComponent.prototype.init.apply(this, arguments);
		},
		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});
