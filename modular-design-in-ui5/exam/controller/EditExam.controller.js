sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("com.haojia.test.exam.controller.EditExam", {
		onInit: function() {
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("edit").attachPatternMatched(this.onRoutePatternMatched, this);
			this.getView().setModel(new sap.ui.model.json.JSONModel({}));
		},
		onRoutePatternMatched: function(e) {
			var args = e.getParameter("arguments");
			var id = args.id;
			this.getView().getModel().setProperty("/id", id);
		}
	});
});
