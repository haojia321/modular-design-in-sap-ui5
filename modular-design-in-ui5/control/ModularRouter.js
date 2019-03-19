sap.ui.define(['sap/m/routing/Router'], function (Router) {
	"use strict";
	return Router.extend("com.haojia.test.control.ModularRouter", {
		constructor: function () {
			this._ownerComonent = arguments[2];
			this._mainRouteName = null;
			Router.prototype.constructor.apply(this, arguments);
		},
		initialize: function (bIgnoreInitialHash) {
			Router.prototype.initialize.apply(this, arguments);
			var componentData = this._ownerComonent.getComponentData();
			if (componentData && componentData.onAfterRouterInitialized) {
				componentData.onAfterRouterInitialized(this._ownerComonent);
			}
		},
		addRoute: function (oConfig, oParent) {
			var componentData = this._ownerComonent.getComponentData();
			if (componentData && componentData.routePatternPrefix) {
				var tempConfig = oConfig;
				var finalRoutePatternPrefix = componentData.parentRoutePatternPrefix ? componentData.parentRoutePatternPrefix + componentData.routePatternPrefix :
					componentData.routePatternPrefix;
				if (tempConfig.pattern === '') {
					this._mainRouteName = oConfig.name;
				}
				tempConfig.originalPattern = tempConfig.pattern;
				tempConfig.pattern = finalRoutePatternPrefix + tempConfig.pattern;
				if (tempConfig.subroutes) {
					for (var j = 0; j < tempConfig.subroutes.length; j++) {
						tempConfig.subroutes[j].originalPattern = tempConfig.subroutes[j].pattern;
						tempConfig.subroutes[j].pattern = finalRoutePatternPrefix + tempConfig.subroutes[j].pattern;
					}
				}
				arguments[0] = tempConfig;
			}
			Router.prototype.addRoute.apply(this, arguments);
		},
		getMainRouteName: function () {
			return this._mainRouteName;
		}
	});
}, true);