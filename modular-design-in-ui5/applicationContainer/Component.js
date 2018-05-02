sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"], function(UIComponent, JSONModel) {
	"use strict";
	return UIComponent.extend("com.haojia.test.applicationContainer.Component", {
		metadata : {
			manifest : "json"
		},
		init : function() {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		}
	});
});