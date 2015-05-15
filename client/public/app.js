(function() {

	var module = angular.module('QuoteWall', [
		'ui.router'
	]);

	module.config(function($stateProvider, $urlRouterProvider) {

		// Default.
		$urlRouterProvider.otherwise('/');

		// States.
		$stateProvider
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
				templateUrl: 'templates/quote-list.html',
				controller: 'QuoteListController'
			});
	});

})();
