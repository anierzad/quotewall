(function() {

	var module = angular.module('QuoteWall');

	module.controller('UserListController', ["$scope", "DataService",
		function($scope, DataService) {

			DataService.getUsers().then(
				function(response) {
					$scope.users = response.data;

					angular.forEach($scope.users, function(user) {
						if(user.image_id) {
							user.imageUrl = "http://localhost:8000/api/images/" + user.image_id;
						}
					});
				});

	}]);

})();