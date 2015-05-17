(function() {

	var module = angular.module('QuoteWall', [
		'ui.router',
		'ngFileUpload'
	]);

	module.config(function($stateProvider, $urlRouterProvider) {

		// Default.
		$urlRouterProvider.otherwise('/');

		// States.
		$stateProvider
			.state('quotes', {
				url: '/quotes/',
				templateUrl: 'templates/quote-list.html',
				controller: 'QuoteListController'
			})
			.state('quoteedit', {
				url: '/quotes/edit/:quoteid',
				templateUrl: 'templates/quote-edit.html',
				controller: 'QuoteEditController'
			})
			.state('users', {
				url: '/users/',
				templateUrl: 'templates/user-list.html',
				controller: 'UserListController'
			})
			.state('useredit', {
				url: '/users/edit/:userid',
				templateUrl: 'templates/user-edit.html',
				controller: 'UserEditController'
			})
			.state('home', {
				url: '/',
				templateUrl: 'templates/home-quotes.html',
				controller: 'HomeQuotesController'
			});
	});

})();
