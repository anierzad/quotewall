(function() {

	var module = angular.module('QuoteWall', [
		'ui.router'
	]);

	module.config(function($stateProvider, $urlRouterProvider) {

		// Default.
		$urlRouterProvider.otherwise('/');

		// States.
		$stateProvider
			.state('quotes', {
				url: '/',
				templateUrl: '/templates/quote-list.html',
				controller: 'QuoteListController'
			});
	});

})();
