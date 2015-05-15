(function() {

	var module = angular.module('QuoteWall');

	module.controller('UserListController', ["$scope", "DataService",
		function($scope, DataService) {

			DataService.getUsers().then(
				function(response) {
					$scope.users = response.data;
				});

	}]);

})();