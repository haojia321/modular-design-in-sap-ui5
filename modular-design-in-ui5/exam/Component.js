jQuery.sap.require("com.haojia.test.util.ModularRouter");
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel, ComponentHelper) {
	"use strict";
	return UIComponent.extend("com.haojia.test.exam.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			var self = this;
			UIComponent.prototype.init.apply(self, arguments);
			self.getRouter().initialize();
		}
	});
});