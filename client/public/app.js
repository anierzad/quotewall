(function() {

	var app = angular.module('QuoteWall', [
		'ui.router'
	]);

	app.config(function($stateProvider, $urlRouterProvider) {

		// Default.
		$urlRouterProvider.otherwise("/");

		// States.
		$stateProvider
			.state("home", {
				url: "/",
				templateUrl: "/home.html"
			});
	});

})();
