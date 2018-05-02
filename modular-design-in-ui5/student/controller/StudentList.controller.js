sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("com.haojia.test.student.controller.StudentList", {
		onInit: function() {
			var dummyData = [];
			dummyData.push({
				name: 'Jim',
				id: 'a1'
			});
			dummyData.push({
				name: 'Jack',
				id: 'a2'
			});
			dummyData.push({
				name: 'Greg',
				id: 'a3'
			});
			this.studentListModel = new sap.ui.model.json.JSONModel(dummyData);
			this.getView().setModel(this.studentListModel);
		},
		onPress: function(e) {
			var id = e.getSource().getBindingContext().getObject().id;
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo('EditStudent', {
				id: id
			});
		}
	});

});