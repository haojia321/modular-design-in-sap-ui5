sap.ui.define(["sap/ui/core/Control", "sap/m/Page", "sap/ui/core/ComponentContainer", "sap/m/NavContainer"], function (Control, Page,
	ComponentContainer, NavContainer) {
	"use strict";

	return Control.extend("com.haojia.test.control.ComponentManager", {
		metadata: {
			aggregations: {
				_navContainer: {
					type: 'sap.m.NavContainer',
					multiple: false,
					visibility: 'hidden'
				}
			},
			properties: {
				securityHandler: {
					type: 'sap.ui.core.Control'
				},
				height: {
					type: 'string',
					defaultValue: '100%'
				}
			}
		},
		init: function () {
			this.componentLoaderRegistry = {};
			this.setAggregation('_navContainer', new NavContainer({
				defaultTransitionName: 'show',
				height: this.getHeight()
			}));
			this.setSecurityHandler(sap.ui.core.Component.getOwnerComponentFor(this).getSecurityHandler());
		},
		renderer: function (oRM, oControl) {
			oRM.renderControl(oControl.getAggregation('_navContainer'));
		},
		subscribeFunc: function (channel, oEvent, data) {
			//var component = this.componentLoaderRegistry[channel].getComponentInstance();
			this.getRouter().navTo(data.name, data.parameters, data.replace);
		},
		setHeight: function (value) {
			this.height = value;
			this.getAggregation('_navContainer').setHeight(value);
		},
		showComponent: function (options, callback) {
			if (this.getSecurityHandler() && this.getSecurityHandler().checkPermission && !this.getSecurityHandler().checkPermission(options.name)) {
				return;
			}
			var self = this;
			var name = options.name;
			var payload = options.payload;
			var createNewComponent = options && options.createNewComponent === true;
			var componentLoader = this.componentLoaderRegistry[name];
			var routePatternPrefix = null;
			var componentData = sap.ui.core.Component.getOwnerComponentFor(this).getComponentData();
			var hostFacade = sap.ui.core.Component.getOwnerComponentFor(self).getHostFacade();
			if (componentData && componentData.routePatternPrefix) {
				routePatternPrefix = componentData.routePatternPrefix;
			}

			if (componentLoader && createNewComponent === false) {
				if (payload) {
					componentLoader.getComponentInstance().getComponentData().payload = payload;
				}
				if (callback) {
					callback(componentLoader.getComponentInstance());
				}
				if (componentLoader.getComponentInstance().getComponentData().menuMapping === 'APP_LEVEL') {
					componentLoader.getComponentInstance().getHostFacade().updateMenuSelection(componentLoader.getComponentInstance().getComponentData()
						.menuId);
				}
				this.getAggregation('_navContainer').to(componentLoader.getParent().getId());
			} else {
				hostFacade.setBusy(true);
				var hashReplace = false;
				if (createNewComponent) {
					hashReplace = true;
					sap.ui.core.Component.getOwnerComponentFor(this).getRouter().navTo('Main');
				}
				sap.ui.core.Component.getOwnerComponentFor(this).createComponent({
					async: true,
					usage: name,
					componentData: {
						payload: payload,
						hostFacade: hostFacade,
						parentRoutePatternPrefix: routePatternPrefix,
						onAfterRouterInitialized: function (component) {
							var page = new Page({
								showHeader: false,
								enableScrolling: false
							});
							page.addStyleClass('componentManagerPage');
							self.getAggregation('_navContainer').addPage(page);
							self.getAggregation('_navContainer').to(page.getId());
							self.destroyComponent(name);
							componentLoader = self.createComponentLoader('nativeUI5', component);
							componentLoader.placeAt(page);
							self.componentLoaderRegistry[name] = componentLoader;
							//sap.ui.getCore().getEventBus().subscribe(name, 'navTo', self.subscribeFunc, component);
							if (callback) {
								callback(component, hashReplace);
							}
							if (component.getComponentData().menuMapping === 'APP_LEVEL') {
								component.getHostFacade().updateMenuSelection(component.getComponentData().menuId);
							}
							hostFacade.setBusy(false);
						}
					}
				});
			}
			//we cannot rely on promise.then function in this case. Because it only guarantees to be ran after component init funtction.
			//But we need certain logic to be ran after component.init and router.initialize functions to be ran.
		},
		isComponentCreated: function (name) {
			return this.componentLoaderRegistry[name] !== null;
		},
		navTo: function (componentSettings, navToObj /*{name: '', parameters: '', replace: ''}*/ ) {
			var createNewComponent = undefined !== componentSettings.createNewComponent ? componentSettings.createNewComponent : true;
			this.showComponent({
				name: componentSettings.name,
				createNewComponent: createNewComponent,
				payload: componentSettings.payload
			}, function (component, replace) {
				//sap.ui.getCore().getEventBus().publish(channel, 'navTo', navToObj);
				var _replace = undefined !== replace ? replace : navToObj.replace;
				if (navToObj && navToObj.name) {
					component.getRouter().navTo(navToObj.name, navToObj.parameters, _replace);
				} else {
					component.getRouter().navTo(component.getRouter().getMainRouteName(), null, _replace);
				}
			});
		},
		createComponentLoader: function (type, component) {
			var componentLoader;
			switch (type) {
			case 'nativeUI5':
			case 'iframe':
			default:
				componentLoader = new ComponentContainer({
					component: component,
					height: '100%',
					lifecycle: "Container"
				});
				break;
			}
			return componentLoader;
		},
		destroyComponent: function (name) {
			if (this.componentLoaderRegistry[name]) {
				//order matters here
				this.componentLoaderRegistry[name].getComponentInstance().destroy();
				this.getAggregation('_navContainer').removePage(this.componentLoaderRegistry[name].getParent().getId());
				this.componentLoaderRegistry[name].getParent().destroy();
				this.componentLoaderRegistry[name].destroy();
				this.componentLoaderRegistry[name] = null;
			}
		}
	});

}, true);