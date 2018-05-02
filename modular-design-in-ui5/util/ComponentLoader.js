sap.ui.define(["sap/ui/core/Control"], function(Control) {
	"use strict";

	return Control.extend("com.haojia.test.util.ComponentLoader", {
		metadata : {
			aggregations : {
				_navContainer : {
					type : 'sap.m.NavContainer',
					multiple : false,
					visibility : 'hidden'
				}
			}
		},
		init : function() {
			this.componentContainerMap = {};
			this.setAggregation('_navContainer', new sap.m.NavContainer({
				defaultTransitionName : 'show',
				height : 'calc(100% - 3rem)'
			}));
		},
		renderer : function(oRM, oControl) {
			oRM.renderControl(oControl.getAggregation('_navContainer'));
		},
		subscribeFunc : function(channel, oEvent, data) {
			//var component = this.componentContainerMap[channel].getComponentInstance();
			console.log('sub:   nav to', this);
			this.getRouter().navTo(data.name, data.parameters, data.replace);
		},
		showComponent : function(options, callback) {
			var self = this;
			var name = options.name;
			var createNewComponent = options && options.createNewComponent == true;
			var componentContainer = this.componentContainerMap[name];
			var routePatternPrefix = null;
			var componentData = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getParent())).getComponentData();
			if (componentData && componentData.routePatternPrefix) {
				routePatternPrefix = componentData.routePatternPrefix;
			}
			if (componentContainer) {
				if (createNewComponent) {
					sap.ui.getCore().getEventBus().publish('appIsBusy', {
						appIsBusy : true
					});
					sap.ui.getCore().getEventBus().unsubscribe(name, 'navTo', this.subscribeFunc, componentContainer.getComponentInstance());

					var oComponentPromise = sap.ui.core.Component.getOwnerComponentFor(this).createComponent({
						async : true,
						usage : name,
						settings : {
							a : 1
						},
						componentData : {
							parentRoutePatternPrefix : routePatternPrefix,
							onAfterRouterInitialized : function(component) {
								var oldComponent = componentContainer.getComponentInstance();
								componentContainer.setComponent(component);
								oldComponent.destroy();
								sap.ui.getCore().getEventBus().subscribe(name, 'navTo', self.subscribeFunc, component);
								if (callback) {
									callback(component);
								}

								sap.ui.getCore().getEventBus().publish('appIsBusy', {
									appIsBusy : false
								});
							}
						}
					}).then(function(component) {
					//we cannot rely on then function. Because it only guarantees to be ran after component init funtction. 
					//But we need certain logic to be ran after component.init and router.initialize functions to be ran.
					});
				}
				this.getAggregation('_navContainer').to(componentContainer.getParent().getId());
			} else {
				sap.ui.getCore().getEventBus().publish('appIsBusy', {
					appIsBusy : true
				});
				var page = new sap.m.Page({
					showHeader : false
				});
				this.getAggregation('_navContainer').addPage(page);
				this.getAggregation('_navContainer').to(page.getId());
				var oComponentPromise = sap.ui.core.Component.getOwnerComponentFor(this).createComponent({
					async : true,
					usage : name,
					settings : {
						a : 1
					},
					componentData : {
						parentRoutePatternPrefix : routePatternPrefix,
						onAfterRouterInitialized : function(component) {
							componentContainer = new sap.ui.core.ComponentContainer({
								component : component,
								height : '100%',
								lifecycle : "Container"
							}).placeAt(page);
							self.componentContainerMap[name] = componentContainer;
							sap.ui.getCore().getEventBus().subscribe(name, 'navTo', self.subscribeFunc, component);
							if (callback) {
								callback(component);
							}

							sap.ui.getCore().getEventBus().publish('appIsBusy', {
								appIsBusy : false
							});
						}
					}
				}).then(function(component) {
				//we cannot rely on then function. Because it only guarantees to be ran after component init funtction. 
				//But we need certain logic to be ran after component.init and router.initialize functions to be ran.
				});
			}
		},
		isComponentCreated : function(name) {
			return this.componentContainerMap[name] != null;
		},
		navTo : function(channel, navToObj/*{name: '', parameters: '', replace: ''}*/) {
			this.showComponent({
				name : channel,
				createNewComponent : true
			}, function() {
				sap.ui.getCore().getEventBus().publish(channel, 'navTo', navToObj);
			});
		}
	});

}, true);
