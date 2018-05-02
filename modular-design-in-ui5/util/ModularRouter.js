sap.ui.define(['sap/m/routing/Router'], function(Router) {
	"use strict";
	return Router.extend("com.haojia.test.util.ModularRouter", {
		constructor : function() {
			this._ownerComonent = arguments[2];
			var componentData = this._ownerComonent.getComponentData();
			var routes = $.extend(true, [], arguments[0]);
			if (componentData && componentData.routePatternPrefix) {
				var finalRoutePatternPrefix = componentData.parentRoutePatternPrefix ? componentData.parentRoutePatternPrefix + componentData.routePatternPrefix : componentData.routePatternPrefix;
				for (var i = 0; i < routes.length; i++) {
					routes[i].pattern = finalRoutePatternPrefix + routes[i].pattern;
					if (routes[i].subroutes) {
						for (var j = 0; j < routes[i].subroutes.length; j++) {
							routes[i].subroutes[j].pattern = finalRoutePatternPrefix + routes[i].subroutes[j].pattern;
						}
					}
				}
			}
			arguments[0] = routes;
			Router.prototype.constructor.apply(this, arguments);
		},
		initialize : function(bIgnoreInitialHash) {
			Router.prototype.initialize.apply(this, arguments);
			var componentData = this._ownerComonent.getComponentData();
			if (componentData && componentData.onAfterRouterInitialized) {
				componentData.onAfterRouterInitialized(this._ownerComonent);
			}
		}
	});
}, true);
