sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("com.haojia.test.exam.controller.ExamList", {
		onInit: function() {
			var dummyData = [];
			dummyData.push({
				name: 'Art',
				id: 'b1'
			});
			dummyData.push({
				name: 'Computer Science',
				id: 'b2'
			});
			dummyData.push({
				name: 'Math',
				id: 'b3'
			});
			this.examListModel = new sap.ui.model.json.JSONModel(dummyData);
			this.getView().setModel(this.examListModel);
		},
		onPress: function(e) {
			var id = e.getSource().getBindingContext().getObject().id;
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo('EditExam', {
				id: id
			});
		}
	});

});