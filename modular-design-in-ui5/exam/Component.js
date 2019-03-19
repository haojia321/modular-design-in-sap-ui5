sap.ui.define([
	"com/haojia/test/control/BaseComponent",
	"sap/ui/model/json/JSONModel"
], function (BaseComponent, JSONModel) {
	"use strict";
	return BaseComponent.extend("com.haojia.test.exam.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			var self = this;
			BaseComponent.prototype.init.apply(self, arguments);
			self.getRouter().initialize();
		}
	});
});