sap.ui.define([
	"com/haojia/test/control/BaseComponent"
], function (BaseComponent) {
	"use strict";
	return BaseComponent.extend("com.haojia.test.student.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			var self = this;
			BaseComponent.prototype.init.apply(self, arguments);
			setTimeout(function () {
				self.getRouter().initialize();
			}, 3000);
		}
	});
});